/* ============================================
   THE CART & CULINARY CO. — Main JavaScript
   Header, mobile nav, cart modal, cart picker,
   form-to-WhatsApp, scroll reveal.
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

  var ready = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  /* ---- Scroll locking, shared by the drawer and the modal ---- */
  var scrollLocks = 0;
  function lockScroll() {
    scrollLocks++;
    document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    scrollLocks = Math.max(0, scrollLocks - 1);
    if (scrollLocks === 0) document.body.style.overflow = '';
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    var nodes = Array.prototype.filter.call(container.querySelectorAll(FOCUSABLE), function (el) {
      return el.offsetParent !== null;
    });
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (!container.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
  }

  ready(function () {

    /* ==========================================
       HEADER
       ========================================== */
    var header = document.getElementById('siteHeader');

    function onScroll() {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ==========================================
       MOBILE NAV
       ========================================== */
    var hamburger = document.getElementById('hamburger');
    var drawer = document.getElementById('mobileNav');
    var drawerOverlay = document.getElementById('mobileNavOverlay');
    var drawerClose = document.getElementById('mobileNavClose');

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('is-open');
      if (drawerOverlay) drawerOverlay.classList.add('is-open');
      document.body.classList.add('nav-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      lockScroll();
      var first = drawer.querySelector(FOCUSABLE);
      if (first) first.focus();
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      if (drawerOverlay) drawerOverlay.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      unlockScroll();
      if (hamburger) hamburger.focus();
    }

    if (hamburger) hamburger.addEventListener('click', function () {
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    /* ==========================================
       SMOOTH SCROLL + CART JUMP LINKS
       ========================================== */
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      var jump = anchor.getAttribute('data-cart-jump');
      if (jump) {
        e.preventDefault();
        closeDrawer();
        openCartModal(jump);
        return;
      }

      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      /* Close any header dropdown this link was inside. */
      var openMenu = anchor.closest('.category-menu[open]');
      if (openMenu) openMenu.removeAttribute('open');

      /* Any in-page link inside the open modal closes it first. */
      if (anchor.hasAttribute('data-close-modal')) {
        e.preventDefault();
        closeCartModal();
      }

      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      /* The header is fixed, so land the target below it. */
      var headerHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', href);
    });

    /* ==========================================
       OCCASION DROPDOWN (desktop header)
       ========================================== */
    var occasionMenu = document.querySelector('[data-occasion-menu]');
    if (occasionMenu) {
      occasionMenu.innerHTML = T.occasions.map(function (occ) {
        return '<section>' +
          '<a class="nav-menu-cat" href="#occasions">' + esc(occ.name) + '</a>' +
          '<p class="nav-menu-brand">' + esc(occ.detail) + '</p>' +
          '<ul>' + occ.featuredCarts.slice(0, 4).map(function (id) {
            var c = T.cartsById[id];
            return c ? '<li><a href="#cart-' + esc(id) + '" data-cart-jump="' + esc(id) + '">' + esc(c.name) + '</a></li>' : '';
          }).join('') + '</ul>' +
        '</section>';
      }).join('');
    }

    /* Clicking outside a <details> dropdown should close it. */
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.category-menu[open]').forEach(function (d) {
        if (!d.contains(e.target)) d.removeAttribute('open');
      });
    });

    /* ==========================================
       FOOTER + SERVICE AREA LISTS
       ========================================== */
    var footerCats = document.querySelector('[data-footer-categories]');
    if (footerCats) {
      footerCats.innerHTML = T.categories.map(function (c) {
        return '<li><a href="/categories/' + esc(c.id) + '/">' + esc(c.name) + '</a></li>';
      }).join('');
    }

    var primaryList = document.querySelector('[data-service-primary]');
    if (primaryList) primaryList.innerHTML = T.serviceAreas.primary.map(function (a) {
      return '<li>' + esc(a) + '</li>';
    }).join('');

    var extendedList = document.querySelector('[data-service-extended]');
    if (extendedList) extendedList.innerHTML = T.serviceAreas.extended.map(function (a) {
      return '<li>' + esc(a) + '</li>';
    }).join('');

    var footerCities = document.querySelector('[data-footer-cities]');
    if (footerCities) {
      footerCities.textContent = 'Located in Delhi NCR — serving events all over India, ' +
        'from Agra to Jaipur to the hills.';
    }

    var yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ==========================================
       CART PICKER (used on both forms)
       ========================================== */
    function buildPicker(host, limit) {
      var chosen = [];
      host.innerHTML = T.categories.map(function (cat) {
        var head = '<details class="picker-group">' +
          '<summary>' + esc(cat.name) + ' <span>' + cat.carts.length + '</span></summary>' +
          '<div class="picker-items">' +
          cat.carts.map(function (c) {
            return '<label class="picker-item">' +
              '<input type="checkbox" value="' + esc(c.name) + '" data-cat="' + esc(cat.name) + '">' +
              '<span><strong>' + esc(c.name) + '</strong><em>' + esc(c.note) + '</em></span>' +
            '</label>';
          }).join('') +
          '</div></details>';
        return head;
      }).join('');

          /* Re-render the chosen summary whenever a box is ticked.
         The summary is a static sibling of the picker in the HTML, so we
         fill it rather than inject it — injecting it inside the picker
         wrapper inherited the wrapper's border/background and rendered as
         a broken grey bar. */
      var summary = host.parentElement.querySelector('.picker-summary');
      if (!summary) {
        summary = document.createElement('p');
        summary.className = 'picker-summary';
        host.insertAdjacentElement('afterend', summary);
      }

      function updateSummary() {
        var picked = Array.prototype.slice.call(host.querySelectorAll('input:checked'));
        chosen = picked.map(function (i) { return i.value; });
        if (!chosen.length) {
          summary.textContent = 'Nothing selected yet.';
          summary.classList.remove('has-value');
          return;
        }
        var shown = limit ? chosen.slice(0, limit) : chosen;
        var text = shown.join(', ');
        if (limit && chosen.length > limit) text += ' +' + (chosen.length - limit) + ' more';
        summary.textContent = chosen.length + ' selected: ' + text;
        summary.classList.add('has-value');
      }

      host.addEventListener('change', updateSummary);
      updateSummary();

      return function getSelected() {
        return Array.prototype.map.call(host.querySelectorAll('input:checked'), function (i) {
          return i.value;
        });
      };
    }

    var getCustomSelection = null;
    var customPicker = document.getElementById('customCartPicker');
    if (customPicker) getCustomSelection = buildPicker(customPicker, 8);

    var getContactSelection = null;
    var contactPicker = document.getElementById('contactCartPicker');
    if (contactPicker) getContactSelection = buildPicker(contactPicker, 8);

    /* ==========================================
       CART DETAIL MODAL
       ========================================== */
    var modal = document.getElementById('cartModal');
    var modalOpener = null;

    function openCartModal(id) {
      var cart = T.cartsById[id];
      if (!cart || !modal) return;

      document.getElementById('cartModalCategory').textContent = cart.categoryName;
      document.getElementById('cartModalTitle').textContent = cart.name;
      document.getElementById('cartModalTagline').textContent = cart.tagline;
      document.getElementById('cartModalDesc').textContent = cart.description;

      var html = '';
      cart.details.forEach(function (section, i) {
        html += '<div class="modal-details-group">';
        html += '<h3>' + esc(section.heading) + '</h3>';
        html += '<ul>' + section.items.map(function (item) {
          return '<li>' + esc(item) + '</li>';
        }).join('') + '</ul>';
        html += '</div>';
      });
      document.getElementById('cartModalSections').innerHTML = html;

      var enquire = document.getElementById('cartModalEnquire');
      enquire.setAttribute('href', cart.waLink);

      modal.removeAttribute('hidden');
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      lockScroll();
      modalOpener = document.activeElement;
      document.getElementById('cartModalClose').focus();
    }

    function closeCartModal() {
      if (!modal || !modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
      unlockScroll();
      if (modalOpener && typeof modalOpener.focus === 'function') modalOpener.focus();
      modalOpener = null;
    }

    if (modal) {
      document.getElementById('cartModalClose').addEventListener('click', closeCartModal);
      document.getElementById('cartModalOverlay').addEventListener('click', closeCartModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') {
        if (modal && modal.classList.contains('is-open')) trapFocus(modal, e);
        return;
      }
      if (modal && modal.classList.contains('is-open')) { closeCartModal(); return; }
      if (drawer && drawer.classList.contains('is-open')) closeDrawer();
    });

    /* Deep link: /#cart-kunafa opens that cart. */
    if (window.location.hash.indexOf('#cart-') === 0) {
      var requested = window.location.hash.slice(6);
      if (T.cartsById[requested]) window.setTimeout(function () { openCartModal(requested); }, 0);
    }

    /* ==========================================
       FORMS -> WHATSAPP
       ========================================== */
    function line(label, value) {
      return value ? '\n*' + label + ':* ' + value : '';
    }

    function openWa(text, feedbackEl, successMsg) {
      var url = 'https://wa.me/' + T.whatsapp + '?text=' + encodeURIComponent(text);
      var win = window.open(url, '_blank');
      if (win) {
        feedbackEl.textContent = successMsg;
        feedbackEl.classList.add('is-ok');
      } else {
        feedbackEl.textContent = 'Your browser blocked the new window. ';
        feedbackEl.classList.remove('is-ok');
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open WhatsApp to send it.';
        feedbackEl.appendChild(link);
      }
    }

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }

        var val = function (id) {
          var el = document.getElementById(id);
          return el ? el.value.trim() : '';
        };

        var occasion = document.getElementById('formOccasion').value;
        var venue = val('formVenue');
        var diet = val('formDiet');
        var message = val('formMessage');
        var selected = getContactSelection ? getContactSelection() : [];

        var text = "Hello, I'd like a quotation for cart catering.";
        text += line('Name', val('formName'));
        text += line('Phone', val('formPhone'));
        text += line('Occasion', occasion);
        text += line('Date', val('formDate'));
        text += line('Guest count', val('formGuests'));
        text += line('City', val('formCity'));
        text += line('Venue', venue);
        if (selected.length) {
          text += '\n\n*Carts interested in:*\n' + selected.map(function (s) { return '- ' + s; }).join('\n');
        }
        text += line('Dietary needs', diet);
        text += line('Message', message);

        openWa(text, document.getElementById('formFeedback'),
          'WhatsApp is open with your details. Review the message and send it to receive your quotation.');
      });
    }

    var customForm = document.getElementById('customCartForm');
    if (customForm) {
      customForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var val = function (id) {
          var el = document.getElementById(id);
          return el ? el.value.trim() : '';
        };

        var eventType = document.getElementById('customEventType').value;
        var guests = val('customGuests');
        var idea = val('customIdea');
        var selected = getCustomSelection ? getCustomSelection() : [];

        if (!eventType && !selected.length && !idea) {
          var fb = document.getElementById('customCartFeedback');
          fb.textContent = 'Pick at least one cart, or tell us your idea, before sending.';
          return;
        }

        var text = "Hello, I'd like to discuss a custom cart for my event.";
        text += line('Event type', eventType);
        text += line('Approx. guests', guests);
        if (selected.length) {
          text += '\n\n*Carts in mind:*\n' + selected.map(function (s) { return '- ' + s; }).join('\n');
        }
        text += line('My idea', idea);

        openWa(text, document.getElementById('customCartFeedback'),
          'WhatsApp is open with your custom cart brief. Send it and we will come back with ideas and a quotation.');
      });
    }

    /* ==========================================
       SCROLL REVEAL
       ========================================== */
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced && 'IntersectionObserver' in window) {
      var targets = document.querySelectorAll('.reveal');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

      targets.forEach(function (el) { observer.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }

  });
})();