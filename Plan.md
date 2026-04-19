# Grameen Enterprise and Fashion — Homepage Plan

A single, animated homepage for a garments-accessories catalog site. Scope is **homepage only** for this phase — no other routes, no admin, no backend integration yet. Data for products/categories is read from a local mock file so the UI can be built end-to-end without touching Mongo/Cloudinary.

---

## 1. Tech (homepage slice)

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind v4 + DaisyUI** for styling
- **Framer Motion** for reveals, hover, modal transitions
- **Swiper** for hero + per-category slideshows + buyer marquee
- **react-icons** for all icons
- **Mock data** in `src/data/mock.ts` (categories, products, site settings) — swapped for Mongoose later

---

## 2. Design System

### Colors
- **Primary:** `#0F3D2E` (deep forest)
- **Accent:** `#C9A24B` (brass/gold)
- **Background:** `#F7F4EF` (warm cream)
- **Ink (text):** `#1A1A1A`
- **Muted:** `#6B6B6B`

Register as a DaisyUI theme `grameen` in `globals.css`.

### Typography
- **Headings:** `Playfair Display` (serif, editorial)
- **Body:** `Inter` (sans, readable)
- Loaded via `next/font`.

### Layout tokens
- Container: `max-w-7xl mx-auto px-4 md:px-8`
- Section spacing: `py-16 md:py-24`
- Card radius: `rounded-2xl`

### Motion rules
- Reveal: fade + 24px slide-up, 500ms `easeOut`, children stagger 70ms
- Hover lift: `translateY(-4px)` + soft shadow, 200ms
- Respect `prefers-reduced-motion` (disable transitions)

---

## 3. Homepage Section Order

```
1. Topbar             (contact + social)
2. Navbar             (logo + menu + search icon)
3. Hero Slider        (4 full-bleed images)
4. Categories         (4 cards, each an auto-slideshow)
5. New Arrival        (latest 12 product cards)
6. Why Choose Us      (4 feature tiles + animated counters)
7. Our Buyers         (infinite logo marquee)
8. Footer             (4 columns)
```

---

## 4. Section-by-section spec

### 4.1 Topbar
- Thin utility bar, `h-10`, dark (`bg-primary`), cream text.
- **Left:** phone (`FiPhone`) + email (`FiMail`) — both clickable (`tel:` / `mailto:`).
- **Right:** social icons — Facebook, LinkedIn, Instagram, WhatsApp (`react-icons/fa`).
- Icons animate on hover: color fade to accent + subtle scale.
- Hidden on mobile (`hidden md:flex`) to save vertical space.

### 4.2 Navbar
- Sticky (`sticky top-0 z-40`), cream background with subtle blur on scroll.
- **Left:** logo mark + "Grameen Enterprise and Fashion" wordmark (serif display font).
- **Center:** menu — `Home`, `About`, `Quality Policy`, `Products`, `Our Buyer`, `Contact`.
  - Links are placeholders (`href="#"`) for now — only `Home` is wired.
  - Active link has an animated underline (Framer Motion `layoutId="nav-underline"`).
  - Hover: accent color + underline slides in.
- **Right:** search icon (`FiSearch`) — opens a centered modal with a single input.
  - Search modal: `AnimatePresence` fade + scale; ESC to close; input autofocused.
  - For now, search filters the mock product list client-side and shows a result list.
- **Mobile:** hamburger icon toggles a slide-in drawer (Framer Motion `x: -100% -> 0`).

### 4.3 Hero Slider (Swiper)
Full-bleed, sits directly below the navbar.

Images (use all four):
```
https://i.ibb.co.com/LhDHTbcd/slide-1.jpg
https://i.ibb.co.com/Zzk8mFDs/slide-2.jpg
https://i.ibb.co.com/6RZVQrCN/slide-3.jpg
https://i.ibb.co.com/YT0y4rP8/slide-4.jpg
```

Specs:
- Height: `h-[72vh] min-h-[480px]`
- Swiper: `effect: 'fade'`, `autoplay: 5000ms`, `loop: true`, `speed: 900`
- **No text, no CTA** (per spec).
- **Ken-Burns effect:** active slide image slowly zooms `scale: 1 -> 1.08` over 8s (Framer Motion on image wrapper).
- Pagination dots bottom-center (custom styled — accent color on active).
- Prev/next chevrons (left/right edges) visible on hover (desktop), always visible (mobile).
- Image uses `next/image` with `priority` on first slide for LCP.

> Note: spec originally said "3 images" but 4 URLs were provided — using all 4; trivial to drop one later.

### 4.4 Categories (4 cards, each its own slideshow)
Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.

Section heading: "Our Categories" (serif, centered) + short one-line subtitle.

**Each card contains:**
- A **Swiper** cycling 3–5 images for that category (autoplay 3s, slide effect, loop).
- Dark gradient overlay from bottom (for text legibility).
- Category name (serif, large) at the bottom-left of the card.
- Product count pill at bottom-right ("24 items").
- **Per-card prev/next chevron buttons** — small, circular, semi-transparent:
  - Desktop: fade in on card hover
  - Mobile: always visible
- Clicking outside the arrows (the image/overlay area) will later link to `/products/[slug]`; for now log to console.
- Card itself: `rounded-2xl overflow-hidden`, hover lifts `-translate-y-1` + shadow growth.

**Mock categories (seed):**
1. Woven Labels
2. Hang Tags
3. Zippers & Trims
4. Packaging

### 4.5 New Arrival (latest 12 product cards)
Grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`.

Section heading: "New Arrival" + underline accent that animates in when the section enters viewport.

**Product card:**
- Square image (`aspect-square`), `object-cover`, `rounded-2xl`.
- Title **below** the image — serif, centered, single line truncate.
- **No buttons, no prices, no descriptions.**
- Hover: image zooms `scale-110` (600ms), title color shifts to accent.
- Entire card clickable — opens lightbox modal (same modal as product page will use later).

**Lightbox modal behavior (homepage teaser of what product page will do):**
- Overlay fade + panel scale-in (Framer Motion `AnimatePresence`).
- Prev/next arrows cycle through the 12 new-arrival items.
- Keyboard: `←`, `→`, `Esc`.
- Image caption = title.
- Close button top-right; overlay click also closes.

Grid entrance: stagger children 60ms, each fades + slides up 20px as section scrolls into view.

### 4.6 Why Choose Us
Four feature tiles in a `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`.

Each tile:
- Line-icon (react-icons, accent color) in a circle badge at top
- Title (serif)
- 2-line short description
- Subtle hover: badge rotates `6deg` + lifts

**Tiles (copy):**
1. **30+ Years Experience** — Serving global buyers since 1994.
2. **ISO-Certified Quality** — Every product meets international standards.
3. **Global Buyer Network** — Trusted by 200+ brands across 20 countries.
4. **On-Time Delivery** — 98% on-time shipment track record.

**Counter strip below tiles:** four stats counting up from 0 when the section enters viewport (Framer Motion `useMotionValue` + `useTransform`):
- 30+ Years • 500+ Products • 200+ Buyers • 20+ Countries

### 4.7 Our Buyers (infinite logo marquee)
- Horizontal strip, `py-12`, cream-to-white subtle gradient.
- Section heading: "Trusted by Leading Brands".
- Row of ~10 grayscale buyer logos (mock placeholders — can be text-based or DiceBear-generated SVGs for now).
- Continuous left-scroll via Framer Motion infinite `animate={{ x: [0, -50%] }}`, `duration: 25s`, `linear`, `repeat: Infinity`.
- Pause on hover.
- Each logo: grayscale + 60% opacity, on hover goes full color + opacity 1.

### 4.8 Footer
Dark background (`bg-primary`), cream text. Grid `grid-cols-1 md:grid-cols-4 gap-10` inside container.

**Column 1 — Brand**
- Logo + wordmark
- 2-line company blurb
- Social icon row

**Column 2 — Quick Links**
- Home, About, Quality Policy, Products, Our Buyer, Contact

**Column 3 — Categories**
- Woven Labels, Hang Tags, Zippers & Trims, Packaging

**Column 4 — Contact**
- Address (2 lines)
- Phone (clickable)
- Email (clickable)

**Bottom bar**
- Thin top-border, `flex justify-between`
- Left: `© 2026 Grameen Enterprise and Fashion. All rights reserved.`
- Right: `Designed with care.`

---

## 5. Component Tree (homepage slice)

```
src/
  app/
    page.tsx                    # renders <Home /> sections in order
    layout.tsx                  # fonts + globals
    globals.css                 # tailwind + daisyui theme
  components/
    site/
      Topbar.tsx
      Navbar.tsx
      SearchModal.tsx
      HeroSlider.tsx
      CategoriesGrid.tsx
      CategoryCard.tsx
      NewArrivalGrid.tsx
      ProductCard.tsx
      ProductLightbox.tsx
      WhyChooseUs.tsx
      Counter.tsx               # count-up animation
      BuyerMarquee.tsx
      Footer.tsx
    ui/
      Container.tsx
      SectionHeading.tsx
      AnimatedSection.tsx       # wraps sections in viewport-reveal motion
  data/
    mock.ts                     # categories[], products[], buyerLogos[], siteSettings
  hooks/
    useReducedMotion.ts
```

---

## 6. Mock Data Shape (`src/data/mock.ts`)

```ts
export type Category = {
  slug: string;
  name: string;
  coverImages: string[];     // 3–5 URLs
  productCount: number;
};

export type Product = {
  id: string;
  title: string;
  image: string;
  categorySlug: string;
  createdAt: string;         // ISO — used to pick latest 12
};

export type BuyerLogo = { name: string; src: string };

export const siteSettings = {
  phone: "+880 1XXXXXXXXX",
  email: "info@grameenfashion.com",
  social: { facebook: "#", linkedin: "#", instagram: "#", whatsapp: "#" },
};

export const categories: Category[] = [/* 4 items */];
export const products: Product[] = [/* ~20 items, pick latest 12 */];
export const buyerLogos: BuyerLogo[] = [/* ~10 items */];
```

Use free placeholder image services (e.g. `picsum.photos`) for mock images — replace with Cloudinary later.

---

## 7. Animation Checklist

| Where | Effect |
|---|---|
| Every section | Fade + slide-up on scroll into view (stagger children) |
| Hero active slide | Slow Ken-Burns zoom |
| Navbar on scroll | Background blur + subtle shadow fades in |
| Active nav link | `layoutId` underline slides between links |
| Category cards | Hover lift + shadow; image zoom inside |
| Product cards | Hover image zoom; title color shift |
| Lightbox open/close | Overlay fade + panel scale-in |
| Why Choose Us | Counters count up from 0 on enter |
| Buyer logos | Infinite marquee, pause on hover |
| Footer links | Accent color + left-shift on hover |
| Global | Disable all of the above if `prefers-reduced-motion` |

---

## 8. Build Order

1. Theme + fonts + `globals.css` + `Container` + `SectionHeading` + `AnimatedSection`
2. Mock data file
3. Topbar + Navbar (with search modal + mobile drawer)
4. Hero Slider
5. Categories grid (with per-card Swiper + arrows)
6. New Arrival grid + Product lightbox
7. Why Choose Us (tiles + counters)
8. Our Buyers marquee
9. Footer
10. Reduced-motion pass + responsive polish

Keep each section self-contained — the homepage `page.tsx` is just a vertical stack of imports.
