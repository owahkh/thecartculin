/* Smoke test: loads every page in a real browser, reports console errors,
   failed network requests, and whether key sections rendered.
   Usage: node test-pages.js            (server must be on :8080) */

const { chromium } = require('playwright');

const BASE = 'http://localhost:8080';

const PAGES = [
  { path: '/', checks: [
    ['.hero-title', 'hero title'],
    ['.cat-cell', 'category cells'],
    ['.occasion-cell', 'occasion cells'],
    ['.how-step', 'how-it-works steps'],
    ['.custom-examples li', 'custom cart examples'],
    ['.service-list li', 'service areas'],
    ['.why-item', 'why-us items'],
    ['.footer-col', 'footer columns'],
    ['.picker-item', 'cart picker options'],
  ]},
  { path: '/categories/chaat/', checks: [['.cart-row', 'cart rows'], ['.cat-hero h1', 'category heading']] },
  { path: '/categories/multi-cuisines/', checks: [['.cart-row', 'cart rows']] },
  { path: '/categories/deserts/', checks: [['.cart-row', 'cart rows']] },
  { path: '/categories/beverages/', checks: [['.cart-row', 'cart rows']] },
  { path: '/categories/haldi-mehndi/', checks: [['.cart-row', 'cart rows']] },
  { path: '/categories/kids/', checks: [['.cart-row', 'cart rows']] },
  { path: '/categories/games/', checks: [['.cart-row', 'cart rows']] },
  { path: '/categories/gifts/', checks: [['.cart-row', 'cart rows']] },
];

(async () => {
  const browser = await chromium.launch();
  let failures = 0;

  for (const spec of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();

    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('pageerror: ' + e.message));
    page.on('requestfailed', r => errors.push('requestfailed: ' + r.url() + ' — ' + (r.failure() || {}).errorText));

    const res = await page.goto(BASE + spec.path, { waitUntil: 'networkidle' });
    const status = res ? res.status() : 0;

    const results = [];
    for (const [sel, label] of spec.checks) {
      const n = await page.locator(sel).count();
      results.push((n > 0 ? '  ok   ' : '  FAIL ') + label + ' (' + sel + ') = ' + n);
      if (n === 0) failures++;
    }

    console.log('\n' + spec.path + '  [' + status + ']');
    results.forEach(r => console.log(r));
    if (errors.length) {
      failures += errors.length;
      errors.forEach(e => console.log('  JS/NET  ' + e.slice(0, 200)));
    }

    await ctx.close();
  }

  /* Interaction checks, homepage only. */
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  console.log('\ninteractions');

  // Cart modal opens from a category list link. Scope to the visible grid,
  // because the same links also exist inside the closed header dropdown.
  await page.locator('.cat-cell-list [data-cart-jump]').first().click();
  await page.waitForTimeout(400);
  const modalOpen = await page.locator('#cartModal.is-open').count();
  const modalTitle = modalOpen ? await page.locator('#cartModalTitle').textContent() : '(none)';
  console.log((modalOpen ? '  ok   ' : '  FAIL ') + 'cart modal opens — title: ' + modalTitle);
  if (!modalOpen) failures++;

  const quoteText = await page.locator('.modal-quote-value').textContent();
  const quoteOk = /quotation/i.test(quoteText);
  console.log((quoteOk ? '  ok   ' : '  FAIL ') + 'modal shows quotation instead of price — "' + quoteText.trim() + '"');
  if (!quoteOk) failures++;

  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const modalClosed = await page.locator('#cartModal.is-open').count() === 0;
  console.log((modalClosed ? '  ok   ' : '  FAIL ') + 'Escape closes modal');
  if (!modalClosed) failures++;

  // No prices anywhere on the page
  const bodyText = await page.locator('body').innerText();
  const priceMatch = bodyText.match(/(₹|Rs\.?\s*\d|\d{1,3},\d{3}\s*(?:-|to)\s*\d)/g);
  const priceOk = !priceMatch;
  console.log((priceOk ? '  ok   ' : '  FAIL ') + 'no prices rendered — found: ' + (priceMatch ? priceMatch.join(', ') : 'none'));
  if (!priceOk) failures++;

  // Custom cart form opens WhatsApp with a prefilled message.
  // Picker groups are collapsed <details>, so open one first.
  await page.locator('#customCartPicker .picker-group > summary').first().click();
  await page.waitForTimeout(200);
  await page.locator('#customCartPicker .picker-item input').first().check();
  await page.locator('#customEventType').selectOption('Haldi');
  await page.locator('#customGuests').fill('180');
  await page.waitForTimeout(150);
  const summary = await page.locator('#customCartPicker ~ .picker-summary').textContent();
  console.log((/1 selected/.test(summary) ? '  ok   ' : '  FAIL ') + 'picker summary updates — "' + summary.trim() + '"');

  if (errs.length) { failures += errs.length; errs.forEach(e => console.log('  JS  ' + e)); }

  // Mobile drawer
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mctx.newPage();
  await mpage.goto(BASE + '/', { waitUntil: 'networkidle' });
  await mpage.locator('#hamburger').click();
  await mpage.waitForTimeout(450);
  const drawerOpen = await mpage.locator('#mobileNav.is-open').count() === 1;
  console.log((drawerOpen ? '  ok   ' : '  FAIL ') + 'mobile drawer opens');
  if (!drawerOpen) failures++;
  const drawerCats = await mpage.locator('.mobile-category-menu details').count();
  console.log((drawerCats === 8 ? '  ok   ' : '  FAIL ') + 'mobile drawer lists 8 categories — got ' + drawerCats);
  if (drawerCats !== 8) failures++;

  await mpage.locator('.mobile-category-menu summary').first().click();
  await mpage.waitForTimeout(250);
  const drawerKids = await mpage.locator('.mobile-category-menu .is-child').count();
  console.log((drawerKids > 0 ? '  ok   ' : '  FAIL ') + 'mobile category expands to carts — ' + drawerKids + ' items');
  if (!drawerKids) failures++;

  await mctx.close();
  await ctx.close();
  await browser.close();

  console.log('\n' + (failures === 0 ? 'ALL CHECKS PASSED' : failures + ' FAILURE(S)'));
  process.exit(failures === 0 ? 0 : 1);
})();