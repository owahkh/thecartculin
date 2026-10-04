/* ============================================
   THE CART & CULIN CO. — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Navigation Toggle ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      isOpen ? closeMobileNav() : openMobileNav();
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // ---- Sticky Header Background ----
  const header = document.getElementById('siteHeader');

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll Reveal Animation ----
  var revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      var revealPoint = 120;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal();

  // ---- Contact Form → WhatsApp Link ----
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('formName').value.trim();
      var phone = document.getElementById('formPhone').value.trim();
      var city = document.getElementById('formCity').value.trim();
      var eventDate = document.getElementById('formDate').value.trim();
      var occasion = document.getElementById('formOccasion').value;
      var guests = document.getElementById('formGuests').value.trim();
      var message = document.getElementById('formMessage').value.trim();

      // UPDATE: Replace with your actual WhatsApp number
      var whatsappNumber = '919312431445';

      var text = 'Hi, I\'m interested in The Cart & Culinary Co. for my event.\n\n';
      text += '*Name:* ' + name + '\n';
      if (phone) text += '*Phone:* ' + phone + '\n';
      if (city) text += '*City:* ' + city + '\n';
      if (eventDate) text += '*Event Date:* ' + eventDate + '\n';
      if (occasion) text += '*Occasion:* ' + occasion + '\n';
      if (guests) text += '*Guest Count:* ' + guests + '\n';
      if (message) text += '*Message:* ' + message;

      var encodedText = encodeURIComponent(text);
      var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodedText;

      window.open(whatsappUrl, '_blank');
    });
  }

  // ---- Gallery Lightbox ----
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var galleryImages = document.querySelectorAll('.gallery-img');
  var currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  galleryImages.forEach(function (img, index) {
    img.addEventListener('click', function () {
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function () {
      navigateLightbox(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function () {
      navigateLightbox(1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // ---- Auto-enquiry WhatsApp links for cart cards ----
  // UPDATE: Replace with your actual WhatsApp number
  var cartWhatsappNumber = '919312431445';

  // ---- Cart detail data (loaded into modal on tile click) ----
  var cartData = {
    chaat: {
      eyebrow: 'Luxury Chaat Cart',
      title: 'Chaat & Street Food Cart',
      img: 'assets/images/chaat.jpg',
      alt: 'Luxury Chaat & Street Food Cart',
      desc: "Bring the nostalgia of India's beloved street food to your celebration. Freshly assembled golgappa, papdi chaat, dahi bhalla, bhel puri, and more — served from a beautifully styled cart, customised to your event.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Classic Golgappa (Pani Puri)', 'Papdi Chaat & Dahi Bhalla'] },
        { heading: 'FRESH INGREDIENTS', items: ['Boondi, Sev & Fresh Coriander', 'Spiced Potatoes & Chickpeas', 'Curd, Mint & Tamarind Chutneys'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Chaat Masala & Fine Sev Sprinkle', 'Pomegranate & Chopped Nuts', '4 Chatpata Paani Flavours'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    kunafa: {
      eyebrow: 'Luxury Kunafa Cart',
      title: 'Kunafa Cart',
      img: 'assets/images/kunafa.jpg',
      alt: 'Luxury Kunafa Cart - Middle Eastern Dessert',
      desc: "Transport your guests with the rich, aromatic flavors of the Middle East through a decadent dessert experience. Freshly baked, warm Kunafa served live with mesmerizing presentation.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Classic Kataifi (Crispy Shredded Phyllo)', "Na'ama (Fine Semolina Dough)"] },
        { heading: 'FRESH INGREDIENTS & CHEESE', items: ['Authentic Akawi & Nabulsi Cheese', 'Rich Ashta (Clotted Cream)', 'Aromatic Orange Blossom & Rosewater Syrup'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Crushed Emerald Pistachios', 'Nutella Syrup', 'White Chocolate Syrup', 'Spiced Honey Drizzle', 'Liquid Belgian Chocolate'] }
      ],
      price: 'Starting at ₹20,000',
      pricenote: 'for 50 Kunafa | ₹30,000 for 100'
    },
    crepe: {
      eyebrow: 'Luxury Crepe Cart',
      title: 'Crepe Cart',
      img: 'https://images.unsplash.com/photo-1755594492462-2907f15cb4b3?w=800&q=80',
      alt: 'Luxury Crepe Cart - French Crepes',
      desc: "Bring the charm of a Parisian patisserie to your celebration. A sophisticated, live-action culinary experience where guests watch custom sweet or savory crepes spun to golden perfection.",
      sections: [
        { heading: 'CHOICE OF BATTER', items: ['Classic French Vanilla', 'Rich Dark Chocolate'] },
        { heading: 'FRESH INGREDIENTS', items: ['Sliced Strawberries & Bananas', 'Mixed Summer Berries', 'Crushed Toasted Hazelnuts & Almonds'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Nutella & White Chocolate', 'Warm Salted Caramel', 'Pure Maple Syrup', 'Freshly Whipped Chantilly Cream'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    pancake: {
      eyebrow: 'Luxury Pancake Cart',
      title: 'Pancake Cart',
      img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
      alt: 'Luxury Pancake Cart - Fluffy Pancakes',
      desc: "Indulge your guests with fluffy, freshly flipped stackable treats. A warm, comforting, yet refined brunch vibe with live mini & soufflé pancake station.",
      sections: [
        { heading: 'CHOICE OF BATTER', items: ['Golden Buttermilk', 'Red Velvet'] },
        { heading: 'FRESH INGREDIENTS', items: ['Fresh Strawberries & Blueberries', 'Caramelized Bananas', 'Chocolate Chips & Toasted Pecans'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Organic Maple Syrup', 'Warm Nutella & White Chocolate', 'Salted Caramel Drizzle', 'Whipped Vanilla Cream'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    waffle: {
      eyebrow: 'Luxury Waffle Cart',
      title: 'Waffle Cart',
      img: 'https://images.unsplash.com/photo-1754444217183-40cb409ad3d8?w=800&q=80',
      alt: 'Luxury Waffle Cart - Belgian Waffles',
      desc: "Elevate your dessert spread with the irresistible aroma of golden, crisp Liege and Belgian waffles crafted live with artisanal toppings and fresh fruits.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Classic Pearl-Sugar Liege Waffle', 'Dark Chocolate Belgian Waffle'] },
        { heading: 'FRESH INGREDIENTS', items: ['Fresh Berry Compote', 'Sliced Bananas & Mangoes', 'Toasted Almond Flakes'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Belgian Chocolate Drizzle', 'Warm Biscoff Spread & Cookie Crumbs', 'Sweetened Condensed Milk', 'Fresh Chantilly Cream'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    dumplings: {
      eyebrow: 'Luxury Dumplings Cart',
      title: 'Delhi Dumplings Cart',
      img: 'https://images.unsplash.com/photo-1647999019630-dabe1a837693?w=800&q=80',
      alt: 'Luxury Dumplings Cart - Delhi Momos',
      desc: "Bring the iconic street-food energy of Capital city dim sums to an elevated event space. Piping-hot, handcrafted momos and dim sums with gourmet fillings.",
      sections: [
        { heading: 'CHOICE OF DUMPLINGS', items: ['Classic Steamed Vegetable & Edamame', 'Paneer & Exotic Herb Dumplings'] },
        { heading: 'FRESH INGREDIENTS', items: ['Scallions & Crispy Garlic', 'Toasted Sesame Seeds', 'Chili Oil Crunch'] },
        { heading: 'SIGNATURE TOPPINGS & DIPS', items: ['Fiery Delhi Red Chili Sauce', 'Tangy Sesame Peanut Dip', 'Soy-Ginger Glaze'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    pizza: {
      eyebrow: 'Luxury Pizza Cart',
      title: 'Pizza Cart',
      img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      alt: 'Luxury Pizza Cart - Neapolitan Pizza',
      desc: "Bring the warmth of an authentic Neapolitan pizzeria straight to your guests. High-heat portable stone ovens yield blistered, airy crusts baked live in minutes.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Classic Margherita (Fresh Basil & Mozzarella)', 'Gourmet Truffle Mushroom & Herb'] },
        { heading: 'FRESH INGREDIENTS', items: ['Fresh Fior di Latte Mozzarella', 'Wild Mushrooms & Baby Spinach', 'Charred Bell Peppers & Olives'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Extra Virgin Olive Oil & Chili Flakes', 'Spicy Honey Drizzle', 'Aged Balsamic Glaze', 'Fresh Basil Leaves'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    pasta: {
      eyebrow: 'Luxury Pasta Cart',
      title: 'Aakhri Pasta Cart',
      img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80',
      alt: 'Luxury Pasta Cart - Italian Pasta',
      desc: "Turn your event into an Italian feast. A theatrical live-cooking experience where guests customize artisanal pasta dishes tossed in rich, bubbling sauces.",
      sections: [
        { heading: 'CHOICE OF PASTA', items: ['Penne Rigate', 'Fresh Fettuccine'] },
        { heading: 'FRESH INGREDIENTS', items: ['Cherry Tomatoes & Baby Spinach', 'Black Olives & Sun-Dried Tomatoes', 'Roasted Garlic & Sauteed Mushrooms'] },
        { heading: 'SIGNATURE TOPPINGS & SAUCES', items: ['Creamy Alfredo Sauce', 'Rich San Marzano Marinara', 'Aged Parmesan & Fresh Basil', 'Chili Flakes & Herb Olive Oil'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    shawarma: {
      eyebrow: 'Luxury Shawarma Cart',
      title: 'Shawarma Cart',
      img: 'assets/images/shawarma.jpeg',
      alt: 'Luxury Shawarma Cart - Middle Eastern Shawarma',
      desc: "Bring the vibrant night-market energy of Middle Eastern street food to your event. Live vertical rotisserie where succulent fillings are shaved fresh and wrapped in warm pita.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Spiced Paneer & Cottage Cheese', 'Roasted Falafel & Mediterranean Veggies'] },
        { heading: 'FRESH INGREDIENTS', items: ['Pickled Turnips & Cucumbers', 'Shredded Iceberg & Tomatoes', 'Parsley & Sumac Onion Salad'] },
        { heading: 'SIGNATURE TOPPINGS & SAUCES', items: ['Classic Garlic Toum', 'Creamy Tahini Sauce', 'Spicy Harissa Glaze'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    chakhna: {
      eyebrow: 'Luxury Chakhna Cart',
      title: 'Chakhna Cart',
      img: 'assets/images/chakhna.jpg',
      alt: 'Luxury Chakhna Cart - Indian Bar Snacks',
      desc: "The ultimate cocktail hour upgrade. Designed specifically to pair with your bar service, offering premium roasted nuts, spicy nibbles, artisan crisps, and tangy dips.",
      sections: [
        { heading: 'CHOICE OF CRUNCH', items: ['Peri-Peri Roasted Cashews & Almonds', 'Truffle & Herb Foxnuts (Makhana)'] },
        { heading: 'FRESH INGREDIENTS & NIBBLES', items: ['Spicy Masala Peanuts', 'Cheese Makhana & Corn Snacks', 'Pickled Olives & Jalapeños'] },
        { heading: 'SIGNATURE DIPS & MIX-INS', items: ['Mint-Yogurt Chutney', 'Tangy Mango Salsa', 'Spiced Lemon & Chaat Masala Sprinkle'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    icecream: {
      eyebrow: 'Luxury Ice Cream Cart',
      title: 'Ice Cream Cart',
      img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80',
      alt: 'Luxury Ice Cream Cart - Gelato',
      desc: "Keep your guests cool with a gourmet, small-batch ice cream experience. Rich, handcrafted gelato and artisanal ice creams served in waffle cones or glass coupes.",
      sections: [
        { heading: 'CHOICE OF FLAVORS', items: ['Belgian Dark Chocolate & Madagascar Vanilla', 'Pistachio Gelato & Alphonso Mango Sorbet'] },
        { heading: 'FRESH INGREDIENTS', items: ['Fresh Strawberries & Mango Cubes', 'Crushed Waffle Cones & Cookie Crumbs', 'Toasted Almonds & Pistachios'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['Warm Fudge & Salted Caramel Sauce', 'Rainbow Sprinkles & Maraschino Cherries', 'Whipped Cream'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    mithai: {
      eyebrow: 'Luxury Mithai Cart',
      title: 'Mithai Cart',
      img: 'assets/images/rasgulla.jpg',
      alt: 'Luxury Mithai Cart - Indian Sweets',
      desc: "Reimagine traditional Indian sweets with modern, high-end presentation. Classic handcrafted sweetmeats with contemporary fusion twists on elegant brass and marble displays.",
      sections: [
        { heading: 'CHOICE OF MITHAI', items: ['Warm Mini Gulab Jamuns & Motichoor Laddoos', 'Saffron Rasmalai Cups'] },
        { heading: 'FRESH INGREDIENTS', items: ['Saffron-Infused Milk', 'Crushed Pistachios & Almonds', 'Fresh Rose Petals'] },
        { heading: 'SIGNATURE TOPPINGS', items: ['24k Edible Gold Leaf', 'Silver Vark & Cardamom Dust', 'Rabri Drizzle'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    south: {
      eyebrow: 'Luxury South Indian Cart',
      title: 'South Indian Cart',
      img: 'https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?w=800&q=80',
      alt: 'Luxury South Indian Cart - Dosa',
      desc: "Bring the comforting, vibrant flavors of coastal South India to your venue. Crisp live-made dosas, mini button idlis, and piping-hot vadais with fresh coconut chutneys.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Mini Mysore Masala Dosas', 'Steamed Button Idlis & Medu Vadas'] },
        { heading: 'FRESH INGREDIENTS', items: ['Tempered Mustard & Curry Leaves', 'Spiced Potato Masala', 'Gunpowder (Podi) & Desi Ghee'] },
        { heading: 'SIGNATURE CHUTNEYS', items: ['Fresh Coconut Chutney', 'Tangy Tomato-Garlic Chutney', 'Spicy Mint-Coriander Chutney'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    },
    chinese: {
      eyebrow: 'Luxury Chinese Cart',
      title: 'Chinese Cart',
      img: 'https://images.unsplash.com/photo-1750174558327-e13e0941f3a7?w=800&q=80',
      alt: 'Luxury Chinese Cart - Indo-Chinese Noodles',
      desc: "Capture the high-energy sizzle of live wok cooking. Freshly tossed Indo-Chinese favorites served piping hot in chic takeaway boxes for an energetic interactive meal.",
      sections: [
        { heading: 'CHOICE OF BASE', items: ['Vegetable Hakka Noodles', 'Fried Rice with Garden Veggies'] },
        { heading: 'FRESH INGREDIENTS', items: ['Crisp Bell Peppers & Bok Choy', 'Spring Onions & Broccoli', 'Crispy Garlic & Green Chilies'] },
        { heading: 'SIGNATURE MAINS & SAUCES', items: ['Chili Paneer / Manchurian', 'Schezwan Sauce Drizzle', 'Tangy Soy-Garlic Glaze'] }
      ],
      price: 'Starting at ₹15,000',
      pricenote: 'for up to 100 pax | ₹25,000 for 200'
    }
  };

  var cartModal = document.getElementById('cartModal');
  var cartModalOverlay = document.getElementById('cartModalOverlay');
  var cartModalClose = document.getElementById('cartModalClose');
  var cartModalImg = document.getElementById('cartModalImg');
  var cartModalEyebrow = document.getElementById('cartModalEyebrow');
  var cartModalTitle = document.getElementById('cartModalTitle');
  var cartModalDesc = document.getElementById('cartModalDesc');
  var cartModalSections = document.getElementById('cartModalSections');
  var cartModalPrice = document.getElementById('cartModalPrice');
  var cartModalPricenote = document.getElementById('cartModalPricenote');
  var cartModalEnquire = document.getElementById('cartModalEnquire');

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function openCartModal(id) {
    var data = cartData[id];
    if (!data || !cartModal) return;
    cartModalImg.src = data.img;
    cartModalImg.alt = data.alt;
    cartModalEyebrow.textContent = data.eyebrow;
    cartModalTitle.textContent = data.title;
    cartModalDesc.textContent = data.desc;
    cartModalPrice.textContent = data.price;
    cartModalPricenote.textContent = data.pricenote;
    cartModalEnquire.setAttribute('data-cart-name', data.title);

    var sectionsHtml = '';
    data.sections.forEach(function (section) {
      sectionsHtml += '<p class="text-sm font-semibold text-charcoal mb-2 mt-5 first:mt-0">' + escapeHtml(section.heading) + '</p>';
      sectionsHtml += '<ul class="text-sm text-gray-600 space-y-1">';
      section.items.forEach(function (item) {
        sectionsHtml += '<li>• ' + escapeHtml(item) + '</li>';
      });
      sectionsHtml += '</ul>';
    });
    cartModalSections.innerHTML = sectionsHtml;

    cartModal.classList.remove('hidden');
    cartModal.classList.add('flex', 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartModal() {
    if (!cartModal) return;
    cartModal.classList.add('hidden');
    cartModal.classList.remove('flex', 'active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cart-tile').forEach(function (tile) {
    var open = function () { openCartModal(tile.getAttribute('data-cart-id')); };
    tile.addEventListener('click', open);
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });

  if (cartModalClose) cartModalClose.addEventListener('click', closeCartModal);
  if (cartModalOverlay) cartModalOverlay.addEventListener('click', closeCartModal);

  document.addEventListener('keydown', function (e) {
    if (!cartModal || !cartModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeCartModal();
  });

  document.querySelectorAll('.cart-enquire-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var cartName = this.getAttribute('data-cart-name');
      var text = 'Hi, I\'m interested in the *' + cartName + '* for my event. Can you share details?';
      var url = 'https://wa.me/' + cartWhatsappNumber + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  });

  // ---- Bottom nav active state (mobile only) ----
  var bottomNavLinks = document.querySelectorAll('[data-navlink]');
  var navTargets = ['home', 'carts', 'gallery', 'contact'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  function setActiveNav(id) {
    bottomNavLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-navlink') === id);
    });
  }

  if (navTargets.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    navTargets.forEach(function (s) { navObserver.observe(s); });
  }

  bottomNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setActiveNav(link.getAttribute('data-navlink'));
    });
  });

});
