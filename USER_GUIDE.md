# Grameen Enterprise and Fashion — User Guide

## What is This Site?

A product showcase website for garments accessories. Visitors can browse products by category, view buyer information, and contact the company. There is **no shopping cart or checkout** — products are displayed with images and titles only.

---

## 1. Getting Started

### Setting Your Login Credentials

Before first use, open the `.env.local` file in the project root and set:

```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=YourPassword
```

Restart the server after any change to `.env.local`.

### Logging In

Go to `/admin/login` and enter your email and password.

After login you will land on the **Dashboard**.

---

## 2. Dashboard

Shows a summary at a glance:

| Card | What it shows |
|------|---------------|
| Total Products | All products in the database |
| Categories | Number of product categories |
| Buyers | Number of buyer entries |
| New Arrivals | Products marked as new arrival |

Quick action buttons link directly to **Add Product** and **Add Category**.

---

## 3. Products

Products are organized by category. The flow is:

```
Products → Select a Category → Gallery of all products in that category
```

### 3.1 Category View (Main Products Page)

- Shows all categories as cards with product count
- Click any category card to open its gallery

### 3.2 Category Gallery

Inside a category you see all products as image tiles.

**Edit a title**
Click on any product title to edit it inline. Press **Enter** or click away to save automatically.

**Delete a product**
Hover over the image — a red delete button appears in the top-right corner. Click it and confirm. The image is also deleted from Cloudinary.

**Mark as New Arrival**
Use the old form view (Add Form button) if you need to toggle New Arrival on a specific product.

### 3.3 Bulk Upload (Recommended for large batches)

1. Click **Bulk Upload** button inside a category gallery
2. Drop or select multiple images at once
3. Each image uploads immediately and shows a title field (pre-filled from the filename)
4. Edit titles as needed
5. Click **Save X Products** — one product is created per image

### 3.4 Add Single Product (Form)

Click **Add (Form)** inside any category gallery, or go to **Products → Add Product**.

Fill in:
- **Title** — product name
- **Category** — select from dropdown
- **New Arrival** — toggle on to show in the New Arrivals section on the homepage
- **Images** — upload one or more images (drag and drop supported)

---

## 4. Categories

Categories control the product groups shown on the website.

### Add a Category

Go to **Categories → Add Category**.

- **Name** — the display name (slug is auto-generated, e.g. "Elastic Products" → `elastic-products`)
- **Description** — optional short description
- **Cover Images** — images shown in the rotating card on the homepage (upload 2–4 for best effect)

### Edit / Delete

- Click the **pencil icon** in the category list to edit
- Click the **trash icon** to delete — deletion is blocked if products still exist in that category

### Active / Inactive Toggle

Each category has a toggle switch in the list.

| State | Effect |
|-------|--------|
| Active | Shown in the website navbar dropdown and homepage category grid |
| Inactive | Hidden from the public website; products still exist |

Use this to hide a category temporarily without deleting it.

---

## 5. Slider

The hero slider appears at the top of the homepage.

### Add a Slide

Click **Upload Slide**, select an image file. It is uploaded and added to the end of the list automatically.

### Reorder Slides

Use the **↑ Up** and **↓ Down** buttons on each slide row to change the order. The first slide shows first on the homepage.

### Delete a Slide

Click the trash icon and confirm. The image is also deleted from Cloudinary.

> **Tip:** Use wide/landscape images (1920×800 or similar) for best slider appearance.

---

## 6. Buyers

Buyer logos are shown on the homepage marquee strip and the Our Buyers page.

### Add a Buyer

Go to **Buyers → Add Buyer**.

- **Name** — company name
- **Country** — optional (e.g. Sweden, Germany)
- **Logo** — upload a single logo image (white background preferred for clean display)

### Edit / Delete

Use the pencil and trash icons in the buyers list. Deleting also removes the logo from Cloudinary.

---

## 7. Contact Info

Go to **Contact** in the sidebar.

Fill in any of these fields:

| Field | Used on |
|-------|---------|
| Phone | Topbar, Contact page |
| Email | Topbar, Contact page |
| Address | Contact page |
| Facebook URL | Topbar social icons, Contact page |
| LinkedIn URL | Topbar social icons, Contact page |
| WhatsApp | Topbar social icons, Contact page |

Click **Save Contact Info**. Changes appear on the public site immediately.

Leave a field blank to hide that item from the website.

---

## 8. Page Content

Go to **Pages** in the sidebar. Three tabs are available:

### About Us
- **Title** — main heading on the About page
- **Body** — text content (plain text or HTML)
- **Images** — photos shown in the photo grid section

### Quality Policy
- **Title** — heading on the Quality Policy page
- **Body** — policy text content

### Home Features
- **Title** — heading for the "Why Choose Us" section
- **Body** — subtitle text below the heading

> Note: The feature icons and individual feature cards on the homepage are hardcoded. Only the section heading and subtitle are editable here.

Click **Save** on each tab to save that section independently.

---

## 9. Public Website Pages

| URL | What visitors see |
|-----|-------------------|
| `/` | Homepage: hero slider, category grid, new arrivals, why choose us, buyer marquee |
| `/products` | All products with category filter sidebar |
| `/products?category=slug` | Filtered by category |
| `/about` | About page |
| `/quality-policy` | Quality policy page |
| `/our-buyer` | Buyer logos grid |
| `/contact` | Contact info + map |

---

## 10. Image Guidelines

| Section | Recommended size | Notes |
|---------|-----------------|-------|
| Hero Slider | 1920 × 800 px | Landscape, no text on image |
| Category Cover | 800 × 1000 px | Portrait works best |
| Product Images | 800 × 800 px | Square, white or clean background |
| Buyer Logos | 400 × 200 px | White background, PNG preferred |

All images are stored on **Cloudinary** and automatically optimized for web delivery. Deleting a product, category, slider slide, or buyer also removes the image from Cloudinary.

---

## 11. Environment Variables Reference

These are set in `.env.local` in the project root.

```
MONGODB_URI              MongoDB connection string
CLOUDINARY_CLOUD_NAME    Cloudinary cloud name
CLOUDINARY_API_KEY       Cloudinary API key
CLOUDINARY_API_SECRET    Cloudinary API secret
NEXTAUTH_SECRET          Random secret string (any long random value)
NEXTAUTH_URL             Full URL of the site (e.g. http://localhost:3000)
ADMIN_EMAIL              Login email for admin panel
ADMIN_PASSWORD           Login password for admin panel
```

> **Security:** Never commit `.env.local` to git. It is already in `.gitignore`.

---

## 12. Changing the Admin Password

1. Open `.env.local`
2. Change `ADMIN_PASSWORD` to the new password
3. Save the file
4. Restart the server (`npm run dev` or redeploy)

There is no in-app password change screen — the credentials are read directly from environment variables.
