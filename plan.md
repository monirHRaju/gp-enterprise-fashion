# Module-Wise Build Plan

## Module 1 — Project Setup & Configuration
**What to do:** Initialize Next.js 14 with App Router, TypeScript, Tailwind, DaisyUI. Install all dependencies. Set up .env.local with MongoDB URI, Cloudinary keys, and NextAuth secret. Configure tailwind.config.ts with DaisyUI theme.

**Prompt:**
Set up a Next.js 14 App Router project with TypeScript, Tailwind CSS, and DaisyUI. Install these dependencies: mongoose, next-auth, cloudinary, framer-motion, swiper, react-icons, @types/mongoose. Create a .env.local template with MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL. Configure tailwind.config.ts with DaisyUI enabled and a custom theme named "grameen" using a professional green and gold color palette. Show the complete file structure for an App Router project with a /admin route group and a /(site) route group.

## Module 2 — Database Models (Mongoose)
**What to do:** Create all Mongoose schemas inside /lib/models/.
**Models to create:**
- Product — title, images (array), category (ref), isNewArrival, createdAt
- Category — name, slug, description, coverImages (array)
- SliderImage — imageUrl, publicId, order
- PageContent — page (enum: about, quality, buyers), title, body, images
- ContactInfo — phone, email, address, facebook, linkedin, whatsapp
- Buyer — name, logo, country

**Prompt:**
Create Mongoose models in TypeScript for a garments showcase website. Models needed: (1) Product with fields: title (string, required), images (array of {url, publicId}), category (ObjectId ref to Category), isNewArrival (boolean, default false), createdAt. (2) Category with: name, slug (unique), description, coverImages (array of {url, publicId}). (3) SliderImage with: imageUrl, publicId (cloudinary), order (number). (4) PageContent with: page (enum: 'about'|'quality'|'buyers'), title, body (string), images array. (5) ContactInfo (single document) with: phone, email, address, facebook, linkedin, whatsapp. (6) Buyer with: name, logo ({url, publicId}), country. Place each in /lib/models/. Also create a /lib/mongodb.ts file with a cached Mongoose connection helper.

## Module 3 — Cloudinary Integration
**What to do:** Create a reusable Cloudinary upload utility for the admin panel image uploads.

**Prompt:**
Create a Cloudinary integration for a Next.js 14 App Router project. (1) Create /lib/cloudinary.ts that initializes the Cloudinary SDK using env variables. (2) Create a Next.js API route at /api/upload (POST) that accepts multipart FormData with an image file, uploads it to a specific Cloudinary folder (e.g. "grameen/products"), and returns {url, publicId}. (3) Create a DELETE endpoint at /api/upload that accepts {publicId} and deletes the image from Cloudinary. (4) Create a reusable React component ImageUploader.tsx for the admin panel — it should show a drag-and-drop zone, preview the uploaded image, and return the {url, publicId} to the parent via an onUpload callback. Use DaisyUI for styling.

## Module 4 — Layout: Topbar, Navbar & Footer
**What to do:** Build the site-wide layout components that wrap all public pages.

**Prompt:**
Build three layout components for a garments accessories showcase website called "Grameen Enterprise and Fashion" using Next.js 14 App Router, Tailwind CSS, DaisyUI, Framer Motion, and React Icons. (1) Topbar: Shows contact info (phone, email) on the left and social icons (Facebook, LinkedIn, WhatsApp) on the right. Data should be fetched from /api/contact. Use a subtle animated entrance with Framer Motion. (2) Navbar: Logo/brand name on the left, centered nav links (Home, About, Quality Policy, Products, Our Buyer, Contact), a search icon on the right that opens an animated search bar on click. Sticky on scroll with a background blur effect using Framer Motion. Mobile responsive with DaisyUI drawer for hamburger menu. (3) Footer: Company name, short description, quick links, contact details, social icons, copyright. Use Framer Motion for scroll-triggered fade-in animation. All data (contact info) is fetched from MongoDB via a server component.

## Module 5 — Hero Slider
**What to do:** Full-width hero slider using Swiper.js with 3 images, auto-play, no CTA text.

**Prompt:**
Build a full-width Hero Slider component for a Next.js 14 project using Swiper.js and Framer Motion. Requirements: (1) Fetch slider images from /api/slider (returns array of {imageUrl, order}). (2) Use Swiper with autoplay (4s delay), loop, fade effect, and pagination dots. (3) Images should be full-width and 80vh tall, using Next.js <Image> with fill and object-cover. (4) No text or CTA buttons on the slides — just pure images. (5) Add a subtle Ken Burns zoom animation on each active slide using CSS keyframes. (6) Wrap in a Framer Motion container for entrance animation on page load. Make it fully responsive.

## Module 6 — Category Cards (Slideshow per Card)
**What to do:** A section on the homepage showing 4 category cards, each acting as a mini auto-sliding image carousel.

**Prompt:**
Build a "Categories" section for a Next.js 14 homepage using Swiper.js, Framer Motion, Tailwind CSS, and DaisyUI. Requirements: (1) Fetch categories from /api/categories (each has name, slug, coverImages array). (2) Display up to 4 categories in a responsive grid (2x2 on mobile, 4 columns on desktop). (3) Each card contains its OWN independent Swiper instance that auto-slides through the category's coverImages (3s interval, loop). Each card also has prev/next navigation buttons overlaid. (4) Category name is displayed at the bottom of each card with a semi-transparent overlay. (5) Clicking a card navigates to /products?category={slug}. (6) Animate cards into view with Framer Motion stagger effect using whileInView and variants. Make cards visually rich with rounded corners, shadow, and hover scale effect.

## Module 7 — New Arrivals Section
**What to do:** A homepage section showing the 12 most recent products with image and title only.

**Prompt:**
Build a "New Arrivals" section for a Next.js 14 homepage using Framer Motion, Tailwind CSS, and DaisyUI. Requirements: (1) Fetch the latest 12 products where isNewArrival: true from /api/products?newArrival=true&limit=12. (2) Display in a responsive grid: 2 cols mobile, 3 cols tablet, 4 cols desktop. (3) Each product card shows: the first image (using Next.js Image, aspect-ratio square, object-cover), and product title at the bottom. No buttons, no price, no extra info. (4) Clicking a card opens the Products page filtered to its category. (5) Cards animate in with Framer Motion staggerChildren on scroll using useInView. (6) Add a subtle hover effect: image scale up slightly (1.05), card shadow deepens. Section heading "New Arrivals" should have an animated underline reveal.

## Module 8 — Two Extra Homepage Sections
**What to do:** Add "Why Choose Us" and "Our Buyers / Clients" sections.

**Prompt:**
Build two additional homepage sections for "Grameen Enterprise and Fashion" garments accessories website using Framer Motion, Tailwind CSS, DaisyUI. Section 1 — Why Choose Us: Show 4 feature cards (e.g. Premium Quality, Timely Delivery, Global Reach, Custom Orders) each with a React Icon, bold title, and short description. Animate cards in with stagger. Content should be editable from admin (fetch from /api/pages/home-features). Section 2 — Our Buyers: Fetch buyer logos from /api/buyers. Display as a horizontal auto-scrolling logo strip (infinite CSS marquee animation using keyframes). Each buyer has a logo and name. Wrap both sections in Framer Motion scroll-triggered entrance animations. Both sections should have styled section headings with decorative dividers.

## Module 9 — Products Page
**What to do:** /products page with category sidebar on the left and product grid on the right. Clicking an image opens a lightbox modal.

**Prompt:**
Build the Products page for a Next.js 14 App Router project. Route: /products. Requirements: (1) Left sidebar: Fetch all categories from /api/categories. Show as a styled vertical list. Clicking a category filters products. "All Products" option at top. Active category is highlighted. Sidebar collapses to a top filter bar on mobile. (2) Right section: Display filtered products in a responsive grid (2-3 cols). Each item is just an image (Next.js Image, square crop) and title below — no buttons. Clicking an image opens a Lightbox Modal. (3) Lightbox Modal: Uses Framer Motion AnimatePresence for open/close animation. Shows the clicked image large with title. Has Previous and Next arrow buttons to navigate through all images of the SAME category. Keyboard arrow key navigation also supported. Close button top-right. Dark semi-transparent backdrop. (4) URL should update on category change: /products?category=slug using useSearchParams. (5) Category filtering should work both from the URL param and from sidebar clicks. Use Framer Motion layout animations for smooth grid reflow when filtering.

## Module 10 — Static Pages (About, Quality Policy, Contact)
**What to do:** Dynamic but visually rich pages for About, Quality Policy, and Contact, all editable from admin.

**Prompt:**
Build three dynamic pages for a Next.js 14 App Router site using Framer Motion, Tailwind CSS, DaisyUI. All content is fetched from MongoDB via API routes. (1) /about: Fetch content from /api/pages/about (title, body text, images array). Display with a hero image, richly formatted body text, and a photo grid. (2) /quality-policy: Fetch from /api/pages/quality. Display as a formal document-style page with section headings and icons using React Icons. (3) /contact: Fetch from /api/contact (phone, email, address, social links). Show a styled contact info card with icons, an embedded Google Maps iframe, and social links. Add Framer Motion scroll animations to all pages. Use DaisyUI card and divider components throughout.

## Module 11 — Our Buyer Page
**What to do:** A dedicated /our-buyer page showcasing all buyer/client logos in a beautiful grid.

**Prompt:**
Build the "Our Buyer" page for a Next.js 14 App Router project. Route: /our-buyer. Requirements: (1) Fetch all buyers from /api/buyers (each has name, logo.url, country). (2) Display in a clean responsive grid: 2 cols mobile, 3-4 cols desktop. (3) Each card shows the buyer logo (Next.js Image, object-contain, white bg), company name, and country flag emoji or text. (4) Add hover animation: card lifts with shadow, logo scales slightly. (5) Animate the grid with Framer Motion staggerChildren on page load. (6) Add a hero/banner at the top of the page with section title and subtitle. Use Framer Motion for page entrance animation.

## Module 12 — Search Feature
**What to do:** Search functionality triggered from the Navbar search icon.

**Prompt:**
Build a search feature for a Next.js 14 App Router site. Requirements: (1) Search icon in Navbar opens a full-width animated search bar using Framer Motion (slides down from the top). (2) As the user types, it hits /api/search?q=query which searches Product titles and Category names in MongoDB using regex. (3) Results appear in a dropdown below the search bar in real time (debounced, 300ms). Each result shows the product/category image thumbnail and name. (4) Clicking a result navigates to /products?category=slug or the relevant page. (5) Close search on Escape key or clicking outside. (6) Animate results list in with Framer Motion stagger. Make it fully accessible with keyboard navigation.

## Module 13 — Admin Auth (NextAuth)
**What to do:** Protect all /admin routes with a simple credentials-based login.

**Prompt:**
Set up NextAuth.js v5 (Auth.js) in a Next.js 14 App Router project for a simple admin panel. Requirements: (1) Use Credentials provider — single hardcoded admin user (email + password stored in env variables: ADMIN_EMAIL, ADMIN_PASSWORD). No user registration needed. (2) Create /admin/login page with a DaisyUI styled login form (email, password, submit). Show error messages on failed login. (3) Protect all /admin/** routes using middleware (middleware.ts) — redirect unauthenticated users to /admin/login. (4) Add a logout button in the admin layout. (5) Admin session should persist in a JWT cookie. Show complete auth.ts, middleware.ts, and the login page component.

## Module 14 — Admin Panel Layout & Dashboard
**What to do:** A clean, sidebar-based admin layout with a stats dashboard.

**Prompt:**
Build the Admin Panel layout and Dashboard for a Next.js 14 App Router project using Tailwind CSS and DaisyUI. Requirements: (1) Admin Layout (/admin/layout.tsx): Fixed left sidebar with logo, nav links (Dashboard, Products, Categories, Slider, Pages, Buyers, Contact Info), and logout button. Responsive: sidebar collapses to icon-only on small screens. Use DaisyUI menu component. (2) Dashboard (/admin/page.tsx): Show stat cards for: Total Products, Total Categories, Total Buyers, New Arrivals count. Each card fetches count from the relevant API. Add quick-action buttons: "Add Product", "Add Category". Use Framer Motion for card entrance animations. Make the layout professional and clean — not cluttered.

## Module 15 — Admin: Product Management
**What to do:** Full CRUD for products with Cloudinary image upload (multiple images per product).

**Prompt:**
Build the Product Management section of an admin panel in Next.js 14 App Router using Tailwind CSS, DaisyUI, and the Cloudinary image uploader component. Requirements: (1) Product List page (/admin/products): Table of all products with columns: thumbnail, title, category, isNewArrival toggle, actions (Edit, Delete). Pagination (10 per page). (2) Add/Edit Product form (/admin/products/new and /admin/products/[id]): Fields: Title (text), Category (select dropdown from categories API), Multiple image upload (using the reusable ImageUploader component — supports uploading and removing multiple images), isNewArrival (toggle). On submit, POST to /api/products or PATCH to /api/products/[id]. (3) Delete: Show DaisyUI confirmation modal before DELETE request. Also delete images from Cloudinary on product delete. (4) API Routes: Create complete REST API at /api/products (GET all with filter/pagination, POST), /api/products/[id] (GET, PATCH, DELETE).

## Module 16 — Admin: Category, Slider, Buyers, Contact, Pages Management
**What to do:** CRUD for remaining content types — all similar in pattern to product management.

**Prompt:**
Build the remaining admin panel management pages for a Next.js 14 project using DaisyUI and Tailwind. Each should have a list view and add/edit form: (1) Categories (/admin/categories): Fields: Name, Slug (auto-generated from name), Description, Cover Images (multi-image Cloudinary uploader). API: /api/categories. (2) Hero Slider (/admin/slider): Show current slider images in order. Drag to reorder (use a simple up/down button). Upload new images via Cloudinary. Delete existing. API: /api/slider. (3) Our Buyers (/admin/buyers): Add/edit/delete buyers. Fields: Name, Country, Logo (single Cloudinary upload). API: /api/buyers. (4) Contact Info (/admin/contact): Single-document form. Fields: Phone, Email, Address, Facebook URL, LinkedIn URL, WhatsApp number. PATCH to /api/contact. (5) Page Content (/admin/pages): Tabs for About, Quality Policy, Home Features. Each tab has Title, Body (textarea), Images uploader. API: /api/pages/[page]. Use DaisyUI tabs, forms, modals throughout.
