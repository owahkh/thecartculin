/* ============================================
   THE CART & CULINARY CO. — Category rendering
   Renders the category index, the nav dropdowns
   and the standalone category pages from
   assets/js/data.js. No pricing is rendered
   anywhere: every cart routes to a quotation.
   ============================================ */

(function () {
  'use strict';

  var T = window.TCC;
  if (!T) return;

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* Icons drawn as inline SVG so a cart needs no image asset. */
  var ICONS = {
    chaat: 'M4 8c0-2 2-4 4-4h8c2 0 4 2 4 4-2-1-4-1-6 0s-4 1-6 0-4-1-4 0zM5 10h14l-1.5 8.5A2 2 0 0 1 15.5 20h-7a2 2 0 0 1-2-1.5L5 10z',
    wok: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2c1.5 0 3 2.5 3.6 6H8.4C9 7.5 10.5 5 12 5zM8 9.5h8c0 1-.2 2-.4 3H8.4c-.2-1-.4-2-.4-3zm-2 5h12c-.4 2-1 3.5-1.7 4.5H7.7C7 18 6.4 16.5 6 14.5z',
    dessert: 'M4 20h16M6 20a6 6 0 0 1 12 0M12 4v3M9 6l1.5 2M15 6l-1.5 2',
    beverage: 'M7 4h10l-1.2 14.2A2 2 0 0 1 13.8 20H10.2a2 2 0 0 1-2-1.8L7 4zm10 2h1.5a2.5 2.5 0 0 1 0 5H17',
    haldi: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 3.5v13M7.5 7.5c1.5 1.5 1.5 3 0 4.5m9-4.5c-1.5 1.5-1.5 3 0 4.5M8.5 14h7',
    kids: 'M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-8 8a8 8 0 0 1 16 0',
    games: 'M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3M9 15h.01M15 15h.01M12 15h.01M10.5 18h.01M13.5 18h.01',
    custom: 'M12 5v14M5 12h14',
  };

  function icon(name) {
    var d = ICONS[name] || ICONS.custom;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  }

  /* Cart row used on category pages and in the cart browser. */
  function cartRow(cart) {
    return '<a class="cart-row" href="#cart-' + esc(cart.id) + '">' +
      '<span class="cart-row-main">' +
        '<span class="cart-row-name">' + esc(cart.name) + '</span>' +
        '<span class="cart-row-note">' + esc(cart.note) + '</span>' +
      '</span>' +
      '<span class="cart-row-cta">Quotation on request' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
      '</span>' +
    '</a>';
  }

  /* ---- Category index section on the homepage ---- */
  document.querySelectorAll('[data-category-discovery]').forEach(function (host) {
    var promo =
      '<article class="cat-cell is-promo">' +
        '<a class="cat-cell-head" href="#custom-cart">' +
          '<span class="cat-cell-index">' + String(T.categories.length + 1).padStart(2, '0') + '</span>' +
          '<span class="cat-cell-icon">' + icon('custom') + '</span>' +
          '<span class="cat-cell-arrow" aria-hidden="true">↗</span>' +
        '</a>' +
        '<h3 class="cat-cell-title"><a href="#custom-cart">Design a custom cart</a></h3>' +
        '<p class="cat-cell-brand">Built to order</p>' +
        '<p class="cat-cell-blurb">The catalogue is a starting point. Regional counters, nostalgia carts, diet-specific stations or something nobody else will have.</p>' +
        '<ul class="cat-cell-list">' +
          '<li><a href="#custom-cart">Regional carts — Awadhi, Gujarati, Bengali…</a></li>' +
          '<li><a href="#custom-cart">Nostalgia carts built around your guests</a></li>' +
          '<li><a href="#custom-cart">Themed counters matched to your décor</a></li>' +
          '<li><a href="#custom-cart">Jain, vegan, gluten-free stations</a></li>' +
        '</ul>' +
        '<a class="cat-cell-all" href="#custom-cart">Start a custom brief <span aria-hidden="true">→</span></a>' +
      '</article>';

    host.innerHTML = T.categories.map(function (cat, i) {
      var n = String(i + 1).padStart(2, '0');
      return '<article class="cat-cell">' +
        '<a class="cat-cell-head" href="/categories/' + esc(cat.id) + '/">' +
          '<span class="cat-cell-index">' + n + '</span>' +
          '<span class="cat-cell-icon">' + icon(cat.icon) + '</span>' +
          '<span class="cat-cell-arrow" aria-hidden="true">↗</span>' +
        '</a>' +
        '<h3 class="cat-cell-title"><a href="/categories/' + esc(cat.id) + '/">' + esc(cat.name) + '</a></h3>' +
        '<p class="cat-cell-brand">' + esc(cat.brand) + '</p>' +
        '<p class="cat-cell-blurb">' + esc(cat.tagline) + '</p>' +
        '<ul class="cat-cell-list">' +
          cat.carts.map(function (c) { return '<li><a href="#cart-' + esc(c.id) + '" data-cart-jump="' + esc(c.id) + '">' + esc(c.name) + '</a></li>'; }).join('') +
        '</ul>' +
        '<a class="cat-cell-all" href="/categories/' + esc(cat.id) + '/">All ' + cat.carts.length + ' in ' + esc(cat.name) + ' <span aria-hidden="true">→</span></a>' +
      '</article>';
    }).join('') + promo;
  });

  /* ---- Desktop nav dropdown ----
     Removed: the full catalogue mega-panel covered half the viewport for a
     giant list, when a plain link to the grid serves navigation better. The
     cart browser lives in the #categories section instead. */

  /* ---- Mobile nav accordion ---- */
  document.querySelectorAll('[data-category-mobile]').forEach(function (host) {
    host.innerHTML = T.categories.map(function (cat) {
      return '<details>' +
        '<summary><span>' + esc(cat.name) + '</span><span class="count">' + cat.carts.length + '</span></summary>' +
        '<div class="mobile-cat-body">' +
          '<a class="mobile-nav-link is-brand" href="/categories/' + esc(cat.id) + '/">' + esc(cat.brand) + '</a>' +
          cat.carts.map(function (c) {
            return '<a class="mobile-nav-link is-child" href="#cart-' + esc(c.id) + '" data-cart-jump="' + esc(c.id) + '">' + esc(c.name) + '</a>';
          }).join('') +
        '</div>' +
      '</details>';
    }).join('');
  });

  /* ---- Occasion navigator ---- */
  document.querySelectorAll('[data-occasion-list]').forEach(function (host) {
    host.innerHTML = T.occasions.map(function (occ) {
      return '<article class="occasion-cell">' +
        '<a class="occasion-cell-head" href="#occasions">' + esc(occ.name) + '</a>' +
        '<p class="occasion-cell-detail">' + esc(occ.detail) + '</p>' +
        '<ul>' + occ.featuredCarts.map(function (id) {
          var c = T.cartsById[id];
          return c ? '<li><a href="#cart-' + esc(id) + '" data-cart-jump="' + esc(id) + '">' + esc(c.name) + '</a></li>' : '';
        }).join('') + '</ul>' +
      '</article>';
    }).join('');
  });

  /* ---- Standalone category page ---- */
  var route = document.querySelector('[data-category-page]');
  if (route) {
    var id = route.getAttribute('data-category-page');
    var cat = T.categories.filter(function (c) { return c.id === id; })[0];

    if (!cat) {
      route.innerHTML = '<h1>Category not found</h1><a class="category-cta" href="/">Return to home</a>';
      return;
    }

    document.title = cat.name + ' — ' + cat.brand + ' | The Cart & Culinary Co.';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', cat.tagline + ' ' + cat.carts.length + ' cart options from The Cart & Culinary Co., serving Delhi NCR. Request a quotation.');
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', 'https://thecartculin.com/categories/' + cat.id + '/');

    route.innerHTML =
      '<header class="cat-hero">' +
        '<a class="cat-back" href="/#categories">← All categories</a>' +
        '<div class="cat-hero-icon">' + icon(cat.icon) + '</div>' +
        '<p class="eyebrow">' + esc(cat.brand) + '</p>' +
        '<h1>' + esc(cat.name) + '</h1>' +
        '<p class="cat-hero-tagline">' + esc(cat.tagline) + '</p>' +
        '<p class="cat-hero-desc">' + esc(cat.longDescription) + '</p>' +
        '<p class="cat-hero-best"><strong>Most requested at:</strong> ' + cat.bestFor.map(esc).join(' · ') + '</p>' +
      '</header>' +

      '<section class="cat-page-section">' +
        '<div class="cat-page-section-head">' +
          '<h2>' + cat.carts.length + ' carts in this category</h2>' +
          '<p>Every cart is priced to your event. Open any cart to see what it covers, then request a quotation.</p>' +
        '</div>' +
        '<div class="cart-row-list">' + cat.carts.map(cartRow).join('') + '</div>' +
      '</section>' +

      '<section class="cat-page-section cat-page-quote">' +
        '<h2>Request a quotation</h2>' +
        '<p>Tell us the date, venue and guest count. We reply with a written quotation, usually within 24 hours.</p>' +
        '<div class="cat-page-actions">' +
          '<a class="category-cta" href="' + T.categoryEnquiry(cat.name) + '" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>' +
          '<a class="category-cta is-ghost" href="/custom-cart/">Design a custom cart</a>' +
        '</div>' +
      '</section>';

    /* The cart detail modal only exists on the homepage, so on a category
       page the rows must go straight to the enquiry link instead. */
    if (!document.getElementById('cartModal')) {
      route.querySelectorAll('.cart-row').forEach(function (row) {
        var cartId = row.getAttribute('href').replace('#cart-', '');
        var cart = T.cartsById[cartId];
        if (!cart) return;
        row.setAttribute('href', cart.waLink);
        row.setAttribute('target', '_blank');
        row.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }

  /* Expose the helper so main.js can rebuild links after injecting carts. */
  window.TCC_UI = { esc: esc, icon: icon, cartRow: cartRow };
})();