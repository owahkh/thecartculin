#!/usr/bin/env node
/* Generates one static page per cart category from the category ids in
   assets/js/data.js. Run: node build-category-pages.js */

const fs = require('fs');
const path = require('path');

const root = __dirname;

const CATEGORIES = [
  ['chaat', 'Street Food &amp; Chaat'],
  ['multi-cuisines', 'Live Cooking &amp; Multi-Cuisine'],
  ['deserts', 'Desserts &amp; Mithai'],
  ['beverages', 'Beverages &amp; Bar'],
  ['haldi-mehndi', 'Haldi, Mehndi &amp; Rituals'],
  ['kids', 'Kids &amp; Little Delights'],
  ['games', 'Games &amp; Entertainment'],
];

const WHATSAPP = '919312431445';

function page(id, name) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | The Cart &amp; Culinary Co. — Delhi, Serving India</title>
  <meta name="description" content="Cart catering options in ${name.replace(/&amp;/g, 'and')} from The Cart &amp; Culinary Co., serving all of India from Delhi. Every cart is quoted to your event.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://thecartculin.com/categories/${id}/">
  <link rel="icon" type="image/png" href="../../assets/images/logo-approved.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/tailwind.css">
  <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body class="category-route">

  <header class="category-route-header">
    <a class="is-brand" href="/" aria-label="The Cart and Culinary Co. — home">
      <img src="../../assets/images/logo-wide.png" alt="The Cart &amp; Culinary Co." width="133" height="52">
    </a>
    <a class="is-back" href="/">All carts</a>
  </header>

  <main class="category-page-shell" data-category-page="${id}">
    <h1>${name}</h1>
  </main>

  <footer class="category-route-footer">
    <a href="/">The Cart &amp; Culinary Co.</a>
    <span>Delhi NCR &middot; Pan-India</span>
    <a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener noreferrer">Request a quotation</a>
  </footer>

  <script src="../../assets/js/data.js"></script>
  <script src="../../assets/js/categories.js"></script>
</body>
</html>
`;
}

CATEGORIES.forEach(function ([id, name]) {
  const dir = path.join(root, 'categories', id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(id, name));
  console.log('wrote categories/' + id + '/index.html');
});