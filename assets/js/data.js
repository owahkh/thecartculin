/* ============================================
   THE CART & CULINARY CO. — Site data
   Single source of truth for cart catalogue,
   category groups, service areas and enquiry
   link builders. Consumed by main.js and
   categories.js.
   ============================================ */

window.TCC = (function () {
  'use strict';

  // Business WhatsApp number (country code + number, no +)
  var WHATSAPP = '919312431445';

  /* ---- Service areas, grouped by proximity ---- */
  var serviceAreas = {
    primary: ['South Delhi', 'South West Delhi', 'Central Delhi', 'New Delhi', 'East Delhi', 'North East Delhi', 'West Delhi', 'North West Delhi', 'Gurugram', 'Noida', 'Greater Noida', 'Ghaziabad', 'Faridabad'],
    extended: ['Agra', 'Mathura', 'Vrindavan', 'Jaipur', 'Udaipur', 'Lucknow', 'Chandigarh', 'Mussoorie', 'Rishikesh', 'Varanasi'],
  };

  /* ---- Enquiry link builders ---- */

  function wa(message) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message);
  }

  function genericEnquiry() {
    return wa("Hi, I'd like a quotation for cart catering at my event. Please share details.");
  }

  function cartEnquiry(cartName) {
    return wa("Hi, I'd like a quotation for the *'" + cartName + "'* cart for my event. Please share details and availability.");
  }

  function categoryEnquiry(categoryName) {
    return wa("Hi, I'd like a quotation for cart catering in the *'" + categoryName + "'* category. Please share details.");
  }

  /* ---- Cart catalogue -------------------------------------------------
     Grouped into the seven existing navigation categories.
     No pricing anywhere: every cart routes to a quotation request.
     `note` is the short line shown under the cart name on tiles
     and category pages. `details` are the menu highlights that
     appear once a cart is opened. ------------------------------- */

  var categories = [
    {
      id: 'chaat',
      name: 'Street Food & Chaat',
      brand: 'The Chaat Route',
      tagline: 'Golgappa, papdi, dahi bhalla — the real Delhi street food, done properly.',
      longDescription:
        'The counter that queues form around all evening. Everything is assembled to order so the sev stays crisp and the chutneys stay sharp, with a focused menu rather than fifteen items going cold.',
      bestFor: ['Mehendi', 'Sangeet', 'Cocktail hour', 'Reception'],
      icon: 'chaat',
      carts: [
        {
          id: 'golgappa',
          name: 'Golgappa Cart',
          tagline: 'Six chatpata flavours, filled to order',
          note: 'Pani puri with six different waters',
          description:
            'The single most requested cart at Indian functions. Crisp spheres filled in front of the guest with one of six waters — pudina, hing, jaljeera, sweet-and-sour, sirka and a special batch masala.',
          details: [
            { heading: 'Choice of water', items: ['Pudina (mint)', 'Hing (hing)', 'Jaljeera', 'Sweet & sour', 'Sirka (vinegar)', 'The Cart signature masala'] },
            { heading: 'Accompaniments', items: ['Boondi and fine sev', 'Spiced chickpeas', 'Chopped onion and tomato', 'Coriander and lemon'] },
          ],
        },
        {
          id: 'papdi-chaat',
          name: 'Papdi Chaat Cart',
          tagline: 'The Delhi classic, built fresh',
          note: 'Papdi chaat, dahi bhalla, bhel',
          description:
            'A tight menu of the three Delhi chaats people actually queue for, assembled to order so the crisp never goes soft before it reaches the guest.',
          details: [
            { heading: 'On the counter', items: ['Papdi chaat', 'Dahi bhalla', 'Bhel puri', 'Aloo tikki'] },
            { heading: 'Chutneys', items: ['Mint chutney', 'Tamarind chutney', 'Curd, hung curd and imli'] },
          ],
        },
        {
          id: 'chakhna',
          name: 'Chakhna Cart',
          tagline: 'Bar snacks built for the cocktail hour',
          note: 'Nuts, makhana, pickles and dips',
          description:
            'Designed to sit alongside the bar rather than compete with it. Roasted nuts, spiced makhana, artisan crisps and sharp dips, portioned for guests who are drinking and moving between groups.',
          details: [
            { heading: 'Crunch', items: ['Peri-peri roasted cashews and almonds', 'Truffle and herb foxnuts (makhana)', 'Cheese makhana', 'Corn snacks'] },
            { heading: 'Sharp things', items: ['Pickled olives and jalapenos', 'Spiced masala peanuts', 'Tangy mango salsa'] },
            { heading: 'Dips', items: ['Mint-yogurt chutney', 'Spiced lemon and chaat masala'] },
          ],
        },
        {
          id: 'fries',
          name: 'Loaded Fries Cart',
          tagline: 'Salted, loaded and gone in four bites',
          note: 'Hand-cut fries with four loaded toppings',
          description:
            'The dependable crowd-pleaser, particularly with a younger guest list. Cut on site so they are never sitting, and loaded to order so each portion is hot when it leaves the cart.',
          details: [
            { heading: 'Cut on site', items: ['Plain salted', 'Peri peri', 'Garlic herb'] },
            { heading: 'Loaded on top', items: ['Cheese and jalapeno', 'Truffle parmesan', 'Chilli and cheese', 'Loaded paneer'] },
          ],
        },
      ],
    },

    {
      id: 'multi-cuisines',
      name: 'Live Cooking & Multi-Cuisine',
      brand: 'Flavours Unlimited',
      tagline: 'Wok, tandoor, grill and pasta — cooked live, in front of guests.',
      longDescription:
        'The counters that give an event its entertainment value. Every one of these is cooked live in front of the guest, which means slower service than a buffet but far more of an evening people remember.',
      bestFor: ['Weddings', 'Corporate events', 'Birthday parties', 'Sangeet'],
      icon: 'wok',
      carts: [
        {
          id: 'pasta',
          name: 'Live Pasta Cart',
          tagline: 'Rolled and tossed in front of the guest',
          note: 'Two pasta shapes, four sauces',
          description:
            'Guests choose the shape and the sauce, both finished in the pan. A reliable favourite for corporate events and mixed-age crowds because almost nobody refuses pasta.',
          details: [
            { heading: 'Pasta', items: ['Penne rigate', 'Fresh fettuccine', 'Farfalle'] },
            { heading: 'Sauces', items: ['Creamy Alfredo', 'San Marzano marinara', 'Arrabbiata with chilli', 'Four-cheese'] },
            { heading: 'To finish', items: ['Aged parmesan', 'Fresh basil', 'Chilli flakes and herb olive oil'] },
          ],
        },
        {
          id: 'asian-wok',
          name: 'Asian Wok Cart',
          tagline: 'High-heat tossing, takeaway boxes',
          note: 'Hakka noodles, fried rice, chilli paneer',
          description:
            'The high-energy sizzle station. Everything is tossed to order and served in takeaway boxes so guests can walk and eat, which matters at a sangeet or a reception where people are not sitting down.',
          details: [
            { heading: 'Base', items: ['Vegetable hakka noodles', 'Schezwan noodles', 'Fried rice', 'Burnt garlic noodles'] },
            { heading: 'Main', items: ['Chilli paneer', 'Manchurian', 'Crispy corn and spring onion'] },
            { heading: 'Sauce', items: ['Schezwan drizzle', 'Soy-garlic glaze'] },
          ],
        },
        {
          id: 'pizza',
          name: 'Stone-Baked Pizza Cart',
          tagline: 'Blistered crust from a high-heat oven',
          note: 'Wood-fired base, fresh mozzarella',
          description:
            'A portable high-heat oven on the cart, so a base is baked and served in a couple of minutes rather than pre-made and reheated. Worth the queue at the evening peak.',
          details: [
            { heading: 'Classic', items: ['Margherita with fresh basil', 'Margherita with mozzarella and olive'] },
            { heading: 'Loaded', items: ['Truffle mushroom and herb', 'Paneer tikka', 'Chilli corn'] },
            { heading: 'Finish', items: ['Extra virgin olive oil and chilli flakes', 'Aged balsamic glaze', 'Spiced honey drizzle'] },
          ],
        },
        {
          id: 'tandoor',
          name: 'Tandoor & Grill Cart',
          tagline: 'Charcoal finish, smoked at the table',
          note: 'Skewers, seekh and paneer tikka',
          description:
            'A live charcoal grill where the skewers finish in front of guests. The smell alone pulls people across the venue, which makes it worth placing near the entrance for a reception.',
          details: [
            { heading: 'From the tandoor', items: ['Paneer tikka', 'Malai paneer', 'Murgh tikka'] },
            { heading: 'From the grill', items: ['Seekh kebab', 'Paneer seekh', 'Stuffed potato and cheese'] },
            { heading: 'On the side', items: ['Tandoori roti and butter naan', 'Mint chutney and onion salad', 'Pickled vegetables'] },
          ],
        },
        {
          id: 'shawarma',
          name: 'Shawarma & Roll Cart',
          tagline: 'Live vertical spit, shaved to order',
          note: 'Paneer and falafel, warm pita',
          description:
            'The filling turns on a vertical spit and is shaved fresh for each guest. Late-night queues outside sangeet venues are where this cart earns its place.',
          details: [
            { heading: 'Filling', items: ['Spiced paneer', 'Roasted falafel with mediterranean vegetables'] },
            { heading: 'Salad', items: ['Pickled turnips and cucumber', 'Shredded lettuce and tomato', 'Parsley and sumac onion'] },
            { heading: 'Sauce', items: ['Garlic toum', 'Tahini', 'Harissa glaze'] },
          ],
        },
        {
          id: 'south-indian',
          name: 'South Indian Cart',
          tagline: 'Dosa on the tava, chutney tempered live',
          note: 'Mini dosas, idlis, medu vada',
          description:
            'Crisp mini dosas and small portions designed for an event where guests are sampling rather than sitting down. The chutneys are tempered in front of guests, which is most of the appeal.',
          details: [
            { heading: 'On the tava', items: ['Mysore masala mini dosa', 'Podi and ghee dosa', 'Mini idlis', 'Medu vada'] },
            { heading: 'Tempered chutneys', items: ['Coconut chutney', 'Tomato-garlic chutney', 'Mint-coriander chutney'] },
            { heading: 'Finish', items: ['Desi ghee', 'Gunpowder (podi)', 'Banana and coconut'] },
          ],
        },
        {
          id: 'dimsum',
          name: 'Dimsum Cart',
          tagline: 'Steamers open at the table',
          note: 'Handcrafted momos and dim sums',
          description:
            'Baskets opened in front of the guest so the steam is part of the presentation. Popular with the younger crowd at receptions and corporate events.',
          details: [
            { heading: 'Steamed', items: ['Vegetable and edamame momo', 'Paneer and herb momo', 'Chilli garlic momo'] },
            { heading: 'Fried', items: ['Crispy vegetable dim sum', 'Paneer spring roll'] },
            { heading: 'Dips', items: ['Delhi red chilli sauce', 'Sesame peanut dip', 'Soy-ginger glaze'] },
          ],
        },
      ],
    },

    {
      id: 'deserts',
      name: 'Desserts & Mithai',
      brand: 'Sweet Affairs',
      tagline: 'Dessert counters that hold the floor past dessert time.',
      longDescription:
        'Dessert is what people remember an event by. These counters are built to keep serving well after the meal has ended, and to look good in photographs while they do it.',
      bestFor: ['Receptions', 'Birthday parties', 'Sangeet', 'Corporate events'],
      icon: 'dessert',
      carts: [
        {
          id: 'kunafa',
          name: 'Kunafa Cart',
          tagline: 'Baked hot, served warm in front of guests',
          note: 'Two dough styles, five toppings',
          description:
            'Pulled from the oven while the guest watches and served warm. The single strongest centrepiece on any dessert spread, and the one most worth putting at the entrance.',
          details: [
            { heading: 'Base', items: ['Classic kataifi (crispy shredded phyllo)', "Na'ama (fine semolina dough)"] },
            { heading: 'Inside', items: ['Akawi and nabulsi cheese', 'Ashta (clotted cream)', 'Orange blossom and rosewater'] },
            { heading: 'On top', items: ['Crushed pistachio', 'Nutella', 'White chocolate', 'Spiced honey', 'Liquid Belgian chocolate'] },
          ],
        },
        {
          id: 'mithai',
          name: 'Mithai Cart',
          tagline: 'Traditional Indian sweets, presented properly',
          note: 'Halwai classics on a live display',
          description:
            'The halwai classics that guests expect at a North Indian function, cut and plated to order rather than pre-arranged on a tray.',
          details: [
            { heading: 'On the counter', items: ['Warm mini gulab jamun', 'Motichoor laddoo', 'Saffron rasmalai cup', 'Kaju katli and barfi'] },
            { heading: 'Finish', items: ['Saffron-infused milk and rabri', 'Crushed pistachio', 'Silver vark and cardamom dust'] },
          ],
        },
        {
          id: 'waffle',
          name: 'Waffle Cart',
          tagline: 'Crisp Belgian waffles made to order',
          note: 'Two waffle styles, fresh fruit compote',
          description:
            'Golden Liege waffles with pearl sugar, topped to order with fruit compote and spreads. Strong performer at daytime events and birthdays.',
          details: [
            { heading: 'Waffle', items: ['Classic pearl-sugar Liege', 'Dark chocolate Belgian'] },
            { heading: 'Toppings', items: ['Belgian chocolate drizzle', 'Biscoff spread and cookie crumb', 'Condensed milk', 'Chantilly cream'] },
            { heading: 'Fruit', items: ['Berry compote', 'Sliced banana', 'Mango'] },
          ],
        },
        {
          id: 'crepe',
          name: 'Crepe Cart',
          tagline: 'Thin, spun, and filled to order',
          note: 'Sweet and savoury, two batters',
          description:
            'A proper Parisian crepe spun thin on the griddle, sweet or savoury, handed over folded rather than plated. Works well as a walking dessert at an evening function.',
          details: [
            { heading: 'Batter', items: ['Classic French vanilla', 'Rich dark chocolate'] },
            { heading: 'Sweet', items: ['Nutella and banana', 'Mixed summer berries', 'Salted caramel and cream'] },
            { heading: 'Savoury', items: ['Herb and cheese', 'Spiced potato'] },
          ],
        },
        {
          id: 'pancake',
          name: 'Pancake Cart',
          tagline: 'Fluffy stacks flipped live',
          note: 'Buttermilk and red velvet bases',
          description:
            'A comfortable, unpretentious counter that works well for a morning event or a children\'s section where the adults are also eating.',
          details: [
            { heading: 'Batter', items: ['Golden buttermilk', 'Red velvet'] },
            { heading: 'Fruit', items: ['Strawberry and blueberry', 'Caramelised banana', 'Chocolate chip and toasted pecan'] },
            { heading: 'Syrup', items: ['Maple', 'Nutella', 'Salted caramel', 'Whipped vanilla cream'] },
          ],
        },
        {
          id: 'ice-cream',
          name: 'Ice Cream & Kulfi Cart',
          tagline: 'Gelato, kulfi and falooda, served cold',
          note: 'Gelato, kulfi cones and falooda',
          description:
            'Small-batch gelato alongside the Indian cold treats guests actually ask for at functions. Kulfi is the differentiator against a generic ice cream cart.',
          details: [
            { heading: 'Gelato', items: ['Belgian dark chocolate', 'Madagascar vanilla', 'Pistachio', 'Alphonso mango sorbet'] },
            { heading: 'Indian cold', items: ['Malai kulfi on a stick', 'Kulfi falooda', 'Sundae cup'] },
            { heading: 'To top', items: ['Warm fudge and salted caramel', 'Chopped nuts', 'Whipped cream'] },
          ],
        },
        {
          id: 'cake-pastry',
          name: 'Cake & Pastry Cart',
          tagline: 'Cutting, plating and serving on site',
          note: 'Cakes, pastries and cupcakes',
          description:
            'The dessert cart that handles the birthday cake cutting as well as pastries, so the host is not managing a knife, plates and guests at the same time.',
          details: [
            { heading: 'Cakes', items: ['Celebration cake of your choice', 'Cupcakes, six flavours', 'Chocolate mousse slice'] },
            { heading: 'Pastries', items: ['Brownie and berry cup', 'Tart and muffin', 'Éclair and profiterole'] },
          ],
        },
      ],
    },

    {
      id: 'beverages',
      name: 'Beverages & Bar',
      brand: 'Sip & Savour',
      tagline: 'Chai ki tapri to a full bar — whichever the event needs.',
      longDescription:
        'Most events need more than one kind of drink. These range from a chai counter serving a few hundred cups to a managed bar that takes the load off the venue.',
      bestFor: ['Weddings', 'Corporate events', 'Society events', 'College fests'],
      icon: 'beverage',
      carts: [
        {
          id: 'chai-tapri',
          name: 'Chai Ki Tapri Cart',
          tagline: 'The most requested drink in North India',
          note: 'Masala chai, kulhad style',
          description:
            'A tapri styled counter serving masala chai in kulhads, cut with the right amount of milk for each guest. Volume-heavy and cheap to serve, so it is usually one of the first carts booked.',
          details: [
            { heading: 'Served', items: ['Kadak masala chai', 'Cutting chai', 'Ginger chai'] },
            { heading: 'With', items: ['Kulhad or takeaway cup', 'Sugar to taste', 'Winter special with dry ginger'] },
          ],
        },
        {
          id: 'coffee-cart',
          name: 'Coffee Cart',
          tagline: 'Espresso bar, ground to order',
          note: 'Espresso bar with a grinder',
          description:
            'A compact bar with an actual grinder rather than pre-ground coffee. Reads as considerably more premium than urns of filter coffee for very little extra cost.',
          details: [
            { heading: 'Espresso bar', items: ['Espresso', 'Cortado', 'Cappuccino', 'Latte'] },
            { heading: 'Brewed', items: ['Pour-over filter', 'Cold brew'] },
            { heading: 'With', items: ['Fresh milk and oat milk', 'Sugar and jaggery'] },
          ],
        },
        {
          id: 'mocktail-cart',
          name: 'Mocktail Cart',
          tagline: 'Alcohol-free, but properly made',
          note: 'Fresh-squeezed mocktails, no syrups from a bottle',
          description:
            'Fresh-squeezed mocktails built to order. Worth being specific about this on the site, because most guests assume a mocktail cart is just juice and the real thing converts far better.',
          details: [
            { heading: 'Signature', items: ['Mint lime cooler', 'Mango passion spritz', 'Cucumber and elderflower'] },
            { heading: 'Classic', items: ['Virgin mojito', 'Lemon and mint', 'Watermelon and basil'] },
            { heading: 'Served', items: ['Fresh fruit, no bottled syrup', 'Served with ice in stemware'] },
          ],
        },
        {
          id: 'fresh-juice',
          name: 'Fresh Juice Cart',
          tagline: 'Pressed at the counter, never from a carton',
          note: 'Sugarcane, watermelon, seasonal',
          description:
            'Pressed to order. Sugarcane juice is the volume seller at daytime functions and wedding mornings, and nothing sells it better than watching it being pressed.',
          details: [
            { heading: 'Pressed', items: ['Sugarcane', 'Watermelon', 'Orange', 'Pineapple'] },
            { heading: 'Add on', items: ['Mint and lemon', 'Ginger', 'Black salt'] },
          ],
        },
        {
          id: 'slush-shake',
          name: 'Slush & Shake Cart',
          tagline: 'The children\'s counter that drains the most stock',
          note: 'Slush, shakes, thick milkshakes',
          description:
            'The item most reliably over-ordered at a family function. Better ordered slightly too generous than too tight, since a child who has had one will queue for another.',
          details: [
            { heading: 'Slush', items: ['Mango', 'Strawberry', 'Blue curacao', 'Mixed berry'] },
            { heading: 'Shake', items: ['Oreo and cream', 'Kit kat', 'Mango and almond', 'Salted caramel'] },
          ],
        },
        {
          id: 'front-bar',
          name: 'Managed Bar Cart',
          tagline: 'Licensed staff handling drinks for you',
          note: 'Full bar with licensed bartenders',
          description:
            'A full bar with bartenders who handle pouring, glassware and the ice for the length of the event. The point is the host does not have to staff it themselves at midnight.',
          details: [
            { heading: 'Includes', items: ['Licensed bartenders for the full shift', 'Ice, glassware and bar equipment', 'Chill, mixers and garnishes'] },
            { heading: 'Formats', items: ['Full service', 'Butler style, passed drinks'] },
          ],
        },
      ],
    },

    {
      id: 'haldi-mehndi',
      name: 'Haldi, Mehndi & Rituals',
      brand: 'Rang & Rasam',
      tagline: 'The carts that make a ritual feel like a celebration.',
      longDescription:
        'Haldi and mehndi functions are the most relaxed events of the wedding week, and the most photogenic. These carts add the nostalgic and playful layer that these functions are remembered for.',
      bestFor: ['Haldi', 'Mehndi', 'Sangeet', 'Cradle ceremony'],
      icon: 'haldi',
      carts: [
        {
          id: 'bachpan-ki-yaadein',
          name: 'Bachpan Ki Yaadein Cart',
          tagline: 'The childhood sweets counter',
          note: 'Old-school Indian candies and snacks',
          description:
            'A nostalgia counter of the candies and snacks people actually ate as children, priced as a treat rather than as dessert. Guests photograph it, film it, and then take three plates.',
          details: [
            { heading: 'Candy', items: ['Kaju katli and soan papdi', 'Barfi and chikki', 'Lollipops and toffee', 'Chocolates'] },
            { heading: 'Old-school snacks', items: ['Salted chana and moong', 'Bhujia and mixture', 'Aloo bhujia sev', 'Boondi and mixture'] },
            { heading: 'Served', items: ['Paper cones and small bowls', 'Portioned as a treat, not a course'] },
          ],
        },
        {
          id: 'bangles-cart',
          name: 'Bangles Cart',
          tagline: 'Guests choose, try and keep their own',
          note: 'Matching bangles for the whole function',
          description:
            'A decorated counter of bangles in themed colour sets, which guests choose from and wear for the rest of the function. Frequently stocked as a gift to the guests by the family rather than sold.',
          details: [
            { heading: 'Styles', items: ['Kadas (chooda)', 'Glass bangles', 'Pearl and stone sets', 'Bridal sets'] },
            { heading: 'Colour themes', items: ['Matching the function theme', 'Groom and bride sets', 'Group colour sets for the family'] },
            { heading: 'Served', items: ['Tried on at the cart', 'Kept for the day', 'Optionally gifted to guests'] },
          ],
        },
        {
          id: 'bracelet-cart',
          name: 'Bracelet Cart',
          tagline: 'The smaller sibling of the bangle counter',
          note: 'Thread, kundan and charm bracelets',
          description:
            'Slippers of the bangle counter: thread, kundan, charm and beaded bracelets, in finer detail and a smaller footprint, so it can sit beside the bangle cart or go somewhere the bangle cart is too large for.',
          details: [
            { heading: 'Styles', items: ['Kundan and polki', 'Thread and macrame', 'Charm bracelets', 'Beaded and pearl'] },
            { heading: 'Colour themes', items: ['Matched to the theme', 'Men\'s and women\'s sets', 'Simple daily-wear styles'] },
            { heading: 'Fitting', items: ['Wrist sizing at the cart', 'Elastic or clasp'] },
          ],
        },
        {
          id: 'perfume-bar',
          name: 'Perfume & Aroma Bar',
          tagline: 'A scent counter, not a smoke counter',
          note: 'Attar oils, body mist, scent layering',
          description:
            'A non-alcoholic shisha-style aroma bar with no smoke and no tobacco: attar oils, body mists and layering stations. It carries the visual appeal of a shisha bar while staying clear of Delhi NCR\'s smoke-free rules.',
          details: [
            { heading: 'On the counter', items: ['Attar oils in a scent flight', 'Body mist and room spray', 'Scent layering consultation'] },
            { heading: 'Formats', items: ['Kahwa and herbal steam', 'Sugar scrub station'] },
          ],
        },
        {
          id: 'coconut-cart',
          name: 'Coconut & Frooti Cart',
          tagline: 'The original green-and-white haldi counter',
          note: 'Coconut water, tender coconut, malai',
          description:
            'A cart dressed as a roadside coconut stall with fresh coconut cut in front of the guest. Still one of the most reliably appreciated counters at a haldi.',
          details: [
            { heading: 'On the cart', items: ['Fresh coconut cut to order', 'Malai and shrikhand', 'Coconut water with mint'] },
            { heading: 'Served with', items: ['Kanji vada', 'Dahi kachori'] },
          ],
        },
        {
          id: 'henna-mehndi',
          name: 'Mehndi Artists Corner',
          tagline: 'Artists on site, guests served as they wait',
          note: 'Guests served while the mehndi is applied',
          description:
            'Mehndi artists working on site with food and drink brought to the guest while they sit, which removes the awkward gap where a guest is waiting and not being looked after.',
          details: [
            { heading: 'Artists', items: ['Bridal and guest mehndi', 'Arabic and Bengali design', 'Organic and bridal henna'] },
            { heading: 'Service', items: ['Food served to the seated guest', 'Separate holding area', 'Queue managed during peak'] },
          ],
        },
      ],
    },

    {
      id: 'kids',
      name: 'Kids & Little Delights',
      brand: 'Little Delights',
      tagline: 'For the under-tens, so adults can finish their drink.',
      longDescription:
        'A wedding is 40 per cent children and most caterers forget them. These carts keep the younger guests occupied and fed, which also keeps the adults at the function longer.',
      bestFor: ['Weddings', 'Birthday parties', 'Family events', 'Haldi'],
      icon: 'kids',
      carts: [
        {
          id: 'candy-floss',
          name: 'Candy Floss & Popcorn Cart',
          tagline: 'Spun and popped in front of the guests',
          note: 'Candy floss, popcorn, ice gola',
          description:
            'The most reliable children\'s counter there is. Candy floss is spun on the spot and popcorn is popped to order, which is the whole appeal for a child watching.',
          details: [
            { heading: 'On the cart', items: ['Candy floss, coloured and plain', 'Fresh popcorn', 'Ice gola and crushed ice'] },
            { heading: 'Served in', items: ['Cartoon cones and tubs', 'Little boxes for the takeaway'] },
          ],
        },
        {
          id: 'kids-maggie',
          name: 'Maggie Station',
          tagline: 'Cooked one plate at a time',
          note: 'Maggie noodles with a proper station',
          description:
            'A small live station cooking one plate per child rather than serving bulk. It is the station every parent watches their own child walk up to unprompted.',
          details: [
            { heading: 'Base', items: ['Maggie noodles', 'Instant noodles with vegetables'] },
            { heading: 'Added', items: ['Cheese', 'Egg', 'Schweetz, butter and ajwain'] },
          ],
        },
        {
          id: 'chocolate-fountain',
          name: 'Chocolate Fountain',
          tagline: 'Skewer your own',
          note: 'Real flowing chocolate with fruit and cake',
          description:
            'A genuine flowing chocolate fountain with strawberries, marshmallows, cake cubes and biscuits on skewers. Requires a dedicated table and staff member for the full service.',
          details: [
            { heading: 'Includes', items: ['Chocolate fountain with attendant', 'Skewers', 'Fruit, cake cubes and marshmallows'] },
          ],
        },
        {
          id: 'kids-theatre',
          name: 'Kids Activity Cart',
          tagline: 'Face painting, tattoos and a photo',
          note: 'Face painting, tattoos, temporary tattoos',
          description:
            'Face painters and temporary tattoo artists working from the cart. Gives parents a short break, which in practice is the reason they book something for the children at all.',
          details: [
            { heading: 'Artists', items: ['Face painting', 'Temporary tattoo', 'Airbrush'] },
            { heading: 'Also', items: ['Small goodie bag per child on request'] },
          ],
        },
      ],
    },

    {
      id: 'games',
      name: 'Games & Entertainment',
      brand: 'Fun & Games',
      tagline: 'The reason nobody is checking their phone.',
      longDescription:
        'Food alone does not hold a wedding together in the fourth hour. These are the games and stalls that fill the gaps between functions and keep guests moving.',
      bestFor: ['Sangeet', 'Mehndi', 'Corporate events', 'College fests'],
      icon: 'games',
      carts: [
        {
          id: 'games-carnival',
          name: 'Carnival Games Stall',
          tagline: 'Ring toss, dart board and strength test',
          note: 'Classic midway games with a prize counter',
          description:
            'The classic midway games, run properly with a real prize counter. Needs more floor space than a cart, so it is quoted as a stall rather than a cart.',
          details: [
            { heading: 'Games', items: ['Ring toss', 'Dart board', 'Strength test', 'Shoot the can'] },
            { heading: 'Prizes', items: ['Prize counter', 'Small and grand prizes'] },
          ],
        },
        {
          id: 'giant-games',
          name: 'Giant Game Rentals',
          tagline: 'The ones guests see from across the lawn',
          note: 'Jenga, giant connect four, snakes and ladders',
          description:
            'Oversized versions of the games everyone remembers from childhood. Placed on the lawn, they pull guests out of their chairs and across the venue.',
          details: [
            { heading: 'Games', items: ['Giant Jenga', 'Giant connect four', 'Snakes and ladders', 'Tug of war'] },
          ],
        },
        {
          id: 'photo-booth',
          name: 'Photo & 360 Booth',
          tagline: 'Prints, album and instant sharing',
          note: 'Booth with prints and an instant album',
          description:
            'A booth with prints, a guest album filled through the evening and digital sharing. The most shared content of the whole function.',
          details: [
            { heading: 'Includes', items: ['Booth with attendant', 'Guest album', 'Instant digital sharing'] },
            { heading: 'Props', items: ['Frames and props', 'Custom props to your theme'] },
          ],
        },
        {
          id: 'mehndi-mehendi-photo',
          name: 'Vintage Photo Corner',
          tagline: 'Props and frames for the album',
          note: 'Photobooth-style corner with props',
          description:
            'A corner with frames, props and flowers rather than a machine, for guests who would rather have one proper portrait than forty machine shots.',
          details: [
            { heading: 'Includes', items: ['Props and frames', 'Backdrop and floral arrangement'] },
          ],
        },
      ],
    },
  ];

  /* ---- Occasions, used for the "what are you planning" navigation ---- */
  var occasions = [
    { id: 'wedding', name: 'Wedding', detail: 'Mehendi, sangeet, baraat, reception', featuredCarts: ['golgappa', 'tandoor', 'kunafa', 'chai-tapri', 'bangles-cart', 'shawarma'] },
    { id: 'halfunction', name: 'Haldi & Mehndi', detail: 'Colour, rituals and easy daytime food', featuredCarts: ['bachpan-ki-yaadein', 'coconut-cart', 'mocktail-cart', 'perfume-bar', 'bracelet-cart'] },
    { id: 'sangeet', name: 'Sangeet', detail: 'Late night, high energy, walking food', featuredCarts: ['asian-wok', 'mocktail-cart', 'games-carnival', 'giant-games', 'front-bar'] },
    { id: 'corporate', name: 'Corporate Event', detail: 'Office, conferences, dealer meets', featuredCarts: ['coffee-cart', 'pasta', 'slush-shake', 'pizza', 'mocktail-cart'] },
    { id: 'birthday', name: 'Birthday & Kitty', detail: 'Something for every age group', featuredCarts: ['candy-floss', 'kids-maggie', 'cake-pastry', 'pancake', 'ice-cream'] },
    { id: 'society', name: 'Society & Residential', detail: 'Gated complexes, club nights, anniversaries', featuredCarts: ['front-bar', 'pasta', 'pizza', 'chai-tapri', 'games-carnival'] },
    { id: 'college', name: 'College Fest', detail: 'Large footfall, quick service, low ticket', featuredCarts: 'pasta south-indian asian-wok fresh-juice slush-shake'.split(' ') },
  ];

  /* ---- Flat lookup of every cart, keyed by id ---- */
  var cartsById = {};
  categories.forEach(function (cat) {
    cat.carts.forEach(function (cart) {
      cart.categoryId = cat.id;
      cart.categoryName = cat.name;
      cart.waLink = cartEnquiry(cart.name);
      cartsById[cart.id] = cart;
    });
  });

  return {
    whatsapp: WHATSAPP,
    serviceAreas: serviceAreas,
    categories: categories,
    occasions: occasions,
    cartsById: cartsById,
    wa: wa,
    genericEnquiry: genericEnquiry,
    cartEnquiry: cartEnquiry,
    categoryEnquiry: categoryEnquiry,
  };
})();