# Grameen Enterprise and Fashion — Project Guide for Claude Code

## Project Overview
- **Website Title:** Grameen Enterprise and Fashion
- **Type:** Garments accessories showcase (NOT an e-commerce site)
- **Purpose:** Display products with images and titles only. No prices, no cart, no buy buttons.

## Tech Stack
- **Framework:** Next.js 14 App Router + TypeScript
- **Database:** MongoDB + Mongoose
- **Styling:** Tailwind CSS + DaisyUI (theme: "grameen")
- **Image Storage:** Cloudinary
- **Animation:** Framer Motion
- **Slider:** Swiper.js
- **Icons:** React Icons
- **Auth:** NextAuth.js v5 (Auth.js) — admin only

## Project Folder Structure
```
src/
├── app/
│   ├── (site)/                  ← public pages
│   │   ├── page.tsx             ← homepage
│   │   ├── products/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── our-buyer/page.tsx
│   │   ├── quality-policy/page.tsx
│   │   └── layout.tsx           ← site layout (topbar + navbar + footer)
│   ├── admin/                   ← admin panel
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   ├── slider/
│   │   ├── buyers/
│   │   ├── contact/
│   │   ├── pages/
│   │   └── layout.tsx           ← admin layout (sidebar)
│   └── api/                     ← API routes
│       ├── products/route.ts
│       ├── products/[id]/route.ts
│       ├── categories/route.ts
│       ├── categories/[id]/route.ts
│       ├── slider/route.ts
│       ├── buyers/route.ts
│       ├── contact/route.ts
│       ├── pages/[page]/route.ts
│       ├── upload/route.ts
│       └── search/route.ts
├── components/
│   ├── site/                    ← public UI components
│   └── admin/                   ← admin UI components
├── lib/
│   ├── models/                  ← Mongoose models
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   ├── SliderImage.ts
│   │   ├── PageContent.ts
│   │   ├── ContactInfo.ts
│   │   └── Buyer.ts
│   ├── mongodb.ts               ← DB connection helper
│   └── cloudinary.ts            ← Cloudinary config
└── types/
    ├── index.ts                 ← shared interfaces
    └── global.d.ts              ← global mongoose cache type
```

## Database Models (Mongoose)

### Product
- title: String (required)
- images: [{ url, publicId }]
- category: ObjectId → ref Category (required)
- isNewArrival: Boolean (default: false)
- timestamps: true

### Category
- name: String (required)
- slug: String (unique, auto-generated from name in pre-save hook)
- description: String
- coverImages: [{ url, publicId }]

### SliderImage
- imageUrl: String (required)
- publicId: String (required)
- order: Number (default: 0)

### PageContent
- page: enum ["about", "quality", "buyers", "home-features"] (unique)
- title: String
- body: String
- images: [{ url, publicId }]

### ContactInfo (single document, always upserted)
- phone, email, address, facebook, linkedin, whatsapp: String

### Buyer
- name: String (required)
- country: String
- logo: { url, publicId }
- order: Number (default: 0)

## Completed Modules

### ✅ Module 1 — Project Setup
- Next.js 14 App Router + TypeScript initialized
- Tailwind CSS + DaisyUI configured with custom "grameen" theme (primary: #2e6b3e, secondary: #b8960c)
- All dependencies installed: mongoose, next-auth, cloudinary, framer-motion, swiper, react-icons
- .env.local configured with MONGODB_URI, Cloudinary keys, NextAuth secret, ADMIN_EMAIL, ADMIN_PASSWORD
- next.config.ts updated with Cloudinary remotePatterns
- Folder structure created

### ✅ Module 2 — Mongoose Models
- All 6 models created in /src/lib/models/
- /src/lib/mongodb.ts — cached connection helper with global mongoose pattern
- /src/types/index.ts — TypeScript interfaces for all models
- /src/types/global.d.ts — global mongoose cache declaration
- Every model uses: mongoose.models.X || mongoose.model(...) guard

## Current Module To Build

### 🔄 Module 3 — Cloudinary Integration
Files to create:
1. `/src/lib/cloudinary.ts` — initialize Cloudinary SDK from env vars
2. `/src/app/api/upload/route.ts` — POST (upload image) + DELETE (remove by publicId)
3. `/src/components/admin/ImageUploader.tsx` — drag-and-drop upload component for admin panel

Rules:
- Upload folder on Cloudinary: "grameen/products" for products, "grameen/categories" for categories etc.
- POST returns: { url, publicId }
- DELETE accepts: { publicId } in request body
- ImageUploader component: drag-and-drop zone, image preview, onUpload callback, supports multiple images
- Use DaisyUI for styling the uploader

## Upcoming Modules (build in this order)

### Module 4 — Layout: Topbar, Navbar & Footer
- Topbar: phone + email on left, social icons (FB, LinkedIn, WhatsApp) on right, data from /api/contact
- Navbar: Logo, nav links (Home, About, Quality Policy, Products, Our Buyer, Contact), search icon, sticky with blur on scroll, mobile drawer — ALREADY PARTIALLY BUILT (Navbar.tsx exists)
- Footer: company info, quick links, contact, social icons
- All use Framer Motion entrance animations
- Contact data fetched from MongoDB (server component where possible)

### Module 5 — Hero Slider
- Full-width, 80vh tall
- Swiper with autoplay (4s), loop, fade effect, pagination dots
- Images from /api/slider
- NO text or CTA on slides — images only
- Ken Burns zoom animation on active slide
- Next.js Image with fill + object-cover

### Module 6 — Category Cards (Homepage)
- 4 category cards in responsive grid
- Each card = independent Swiper instance auto-sliding through coverImages (3s interval)
- Individual prev/next buttons per card
- Category name overlay at bottom
- Clicking navigates to /products?category=slug
- Framer Motion stagger animation on scroll

### Module 7 — New Arrivals Section (Homepage)
- Latest 12 products where isNewArrival: true
- Grid: 2 cols mobile → 3 tablet → 4 desktop
- Card: image (square) + title only. No buttons.
- Framer Motion staggerChildren on scroll
- Hover: image scale 1.05, shadow deepen

### Module 8 — Extra Homepage Sections
- "Why Choose Us": 4 feature cards (icon + title + description), content from /api/pages/home-features
- "Our Buyers": infinite horizontal logo marquee strip, logos from /api/buyers
- Both with Framer Motion scroll-triggered animations

### Module 9 — Products Page
- Route: /products
- Left sidebar: category list from /api/categories, "All Products" option, active highlight
- Mobile: sidebar becomes top filter bar
- Right: product grid (2-3 cols), image + title only
- Lightbox modal on image click:
  - Framer Motion AnimatePresence open/close
  - Prev/Next navigation within same category
  - Keyboard arrow key support
  - Dark backdrop, close button
- URL updates on filter: /products?category=slug

### Module 10 — Static Pages
- /about — hero image + body text + photo grid
- /quality-policy — formal document style with icons
- /contact — contact info card + Google Maps iframe + social links
- All content from MongoDB via /api/pages/[page]
- Framer Motion scroll animations throughout

### Module 11 — Our Buyer Page
- Route: /our-buyer
- Grid of buyer logos (2 cols mobile → 4 desktop)
- Each card: logo (object-contain, white bg) + name + country
- Hover: lift + shadow + scale
- Framer Motion stagger on load

### Module 12 — Search Feature
- Triggered from Navbar search icon
- Animated search bar slides down (Framer Motion)
- Hits /api/search?q=query — searches Product titles + Category names via MongoDB regex
- Realtime dropdown results (debounced 300ms)
- Results show: thumbnail + name
- Close on Escape or outside click

### Module 13 — Admin Auth (NextAuth v5)
- Credentials provider only (no registration)
- Admin credentials from env: ADMIN_EMAIL, ADMIN_PASSWORD
- /admin/login page with DaisyUI form
- middleware.ts protects all /admin/** routes
- JWT cookie session
- Logout button in admin layout

### Module 14 — Admin Layout & Dashboard
- Fixed left sidebar: logo, nav links, logout
- Responsive: icon-only on small screens
- Dashboard: stat cards (Total Products, Categories, Buyers, New Arrivals)
- Quick action buttons: Add Product, Add Category

### Module 15 — Admin Product Management
- /admin/products — paginated table (10/page): thumbnail, title, category, isNewArrival toggle, edit/delete
- /admin/products/new and /admin/products/[id] — add/edit form
- Multiple image upload via ImageUploader component
- DaisyUI confirmation modal before delete
- Deletes images from Cloudinary on product delete
- Full REST API: GET (filter + paginate), POST, PATCH, DELETE

### Module 16 — Admin Remaining Managers
- Categories CRUD: name, slug (auto), description, cover images
- Slider Manager: list + reorder (up/down) + upload + delete
- Buyers CRUD: name, country, single logo upload
- Contact Info: single-document upsert form
- Page Content: tabbed editor for About, Quality, Home Features

## Key Coding Conventions
- Always use `connectDB()` from @/lib/mongodb at the start of every API route
- Always use `mongoose.models.X || mongoose.model(...)` pattern in model files
- API routes return NextResponse.json(...)
- Use `serialize` helper to convert MongoDB _id to string before returning from API
- All Cloudinary uploads go through /api/upload — never upload directly from components
- Admin routes must check session before processing (after Module 13 is built)
- Keep site layout components as Server Components where possible, use "use client" only when needed

## Environment Variables Required
```
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=
ADMIN_PASSWORD=
```
