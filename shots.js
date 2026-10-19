/* Captures screenshots of every page/section so layout problems are visible
   rather than guessed at. Usage: node shots.js  (server must be on :8080) */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8080';
const OUT = path.join(__dirname, '.shots');

const SHOTS = [
  { path: '/', name: 'home', full: true, sections: ['hero', 'categories', 'occasions', 'how-it-works', 'custom-cart', 'service', 'about', 'contact'] },
  { path: '/categories/chaat/', name: 'cat-chaat', full: true },
  { path: '/', name: 'home-mobile', viewport: { width: 390, height: 844 }, full: false },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const shot of SHOTS) {
    const vp = shot.viewport || { width: 1440, height: 1000 };
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(BASE + shot.path, { waitUntil: 'networkidle' });

    // Reveal-on-scroll elements never animate if we screenshot straight away.
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in'));
    });
    await page.waitForTimeout(300);

    if (shot.sections) {
      for (const id of shot.sections) {
        const el = page.locator('#' + id);
        if (!(await el.count())) { console.log('  missing #' + id); continue; }
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await el.screenshot({ path: path.join(OUT, shot.name + '--' + id + '.png') });
        const box = await el.boundingBox();
        console.log('  #' + id + '  ' + Math.round(box.width) + 'x' + Math.round(box.height));
      }
    } else {
      await page.screenshot({ path: path.join(OUT, shot.name + '.png'), fullPage: !!shot.full });
    }

    await ctx.close();
  }

  // Cart modal
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.locator('.cat-cell-list [data-cart-jump]').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'modal.png') });
  await ctx.close();

  // Mobile drawer
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mpage = await mctx.newPage();
  await mpage.goto(BASE + '/', { waitUntil: 'networkidle' });
  await mpage.locator('#hamburger').click();
  await mpage.waitForTimeout(500);
  await mpage.locator('.mobile-category-menu summary').first().click();
  await mpage.waitForTimeout(300);
  await mpage.screenshot({ path: path.join(OUT, 'mobile-drawer.png') });
  await mctx.close();

  await browser.close();
  console.log('\nwrote screenshots to .shots/');
})();