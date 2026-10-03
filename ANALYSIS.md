# Reference Site Analysis — the-cartco.com

## Section-by-Section Breakdown

The reference site (the-cartco.com) is a single-page React SPA for a luxury cart catering company in Southern California.

1. **Navigation** — Sticky header, transparent on hero, solid on scroll. Logo left, nav links center, CTA button right. Hamburger menu on mobile with slide-in sheet.
2. **Hero** — Full-viewport (90vh) background image with dark gradient overlay (black/60 fading to transparent). Large serif headline centered, subheading below, CTA button.
3. **About / Story** — Two-column layout (text + image). Warm cream background (#f5f1ea).
4. **Services / Carts** — Grid of service cards (image + title + description). Hover effect: shadow-xl elevation + image zoom.
5. **Gallery** — Responsive image grid. Click opens lightbox modal.
6. **Testimonials** — Card layout with client quotes.
7. **Contact / CTA** — Form or direct contact options.
8. **Footer** — Company info, links, social icons, copyright.

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Primary (warm brown) | #8B4513 | Buttons, accents |
| Background (warm cream) | #F5F1EA | Page background |
| Card background | #FDFBF7 | Card surfaces |
| Text (deep brown) | #2D221E | Headings, body |
| CTA accent (sky blue) | #0284C7 | Primary CTA buttons |

### Typography
- **Headings:** Cormorant Garamond, serif (weights 300-700)
- **Body:** Avenir / Karla, sans-serif (weights 300-600)
- **Hero headline:** Scales responsively (text-[9vw])

### Shadows
- Cards: No default, shadow-xl on hover
- Buttons: Subtle shadow-sm

## Layout Patterns

### Hero
- 90vh height, full-bleed image, gradient overlay, white serif text

### Navigation
- Sticky, transparent-to-solid transition on scroll
- Mobile: hamburger -> slide-in sheet

### Service Cards
- Responsive grid, hover: shadow + image scale

### Gallery
- Responsive grid, lightbox on click

### CTA Placement
- Hero, after services, before footer (every 2-3 sections)

## Interaction Patterns

### Scroll Reveal
- Fade in + slide up on scroll (IntersectionObserver), ~0.5-0.7s

### Hover States
- Cards: shadow transition 0.3s
- Buttons: background darken 0.2s
- Images: scale 1.0 -> 1.05

## What Makes It Premium

1. Generous whitespace
2. Typography contrast (serif headings vs sans body)
3. Restrained color palette
4. Dark hero overlay with gradient
5. Subtle scroll-reveal animations
6. Card elevation on hover
7. Consistent spacing rhythm

## Patterns We're Borrowing

- Section order: hero -> about -> services -> gallery -> contact
- Sticky nav with transparent-to-solid transition
- Full-bleed hero with dark gradient
- Card grid with hover shadow
- Scroll-reveal animations
- Gallery lightbox
- CTA placement every 2-3 sections
