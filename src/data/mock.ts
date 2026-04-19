export type Category = {
  slug: string;
  name: string;
  coverImages: string[];
  productCount: number;
};

export type Product = {
  id: string;
  title: string;
  image: string;
  categorySlug: string;
  createdAt: string;
};

export type BuyerLogo = { name: string };

export const heroSlides: string[] = [
  "https://i.ibb.co.com/LhDHTbcd/slide-1.jpg",
  "https://i.ibb.co.com/Zzk8mFDs/slide-2.jpg",
  "https://i.ibb.co.com/6RZVQrCN/slide-3.jpg",
  "https://i.ibb.co.com/YT0y4rP8/slide-4.jpg",
];

export const siteSettings = {
  brand: "Grameen Enterprise and Fashion",
  short: "Grameen Fashion",
  tagline: "Premium garments accessories for global buyers.",
  phone: "+880 1700-000000",
  email: "info@grameenfashion.com",
  address: ["House 12, Road 4, Gulshan", "Dhaka 1212, Bangladesh"],
  social: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/8801700000000",
  },
};

const img = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = [
  {
    slug: "woven-labels",
    name: "Woven Labels",
    productCount: 48,
    coverImages: [
      img("woven-1", 900, 700),
      img("woven-2", 900, 700),
      img("woven-3", 900, 700),
      img("woven-4", 900, 700),
    ],
  },
  {
    slug: "hang-tags",
    name: "Hang Tags",
    productCount: 36,
    coverImages: [
      img("tag-1", 900, 700),
      img("tag-2", 900, 700),
      img("tag-3", 900, 700),
      img("tag-4", 900, 700),
    ],
  },
  {
    slug: "zippers-trims",
    name: "Zippers & Trims",
    productCount: 52,
    coverImages: [
      img("zip-1", 900, 700),
      img("zip-2", 900, 700),
      img("zip-3", 900, 700),
      img("zip-4", 900, 700),
    ],
  },
  {
    slug: "packaging",
    name: "Packaging",
    productCount: 24,
    coverImages: [
      img("pack-1", 900, 700),
      img("pack-2", 900, 700),
      img("pack-3", 900, 700),
      img("pack-4", 900, 700),
    ],
  },
];

const titles = [
  "Premium Woven Label",
  "Satin Care Label",
  "Leather Patch Tag",
  "Kraft Hang Tag",
  "Eco Cotton Tag",
  "Metal Zipper Slider",
  "Brass Rivet Set",
  "Cord Stopper",
  "Printed Poly Bag",
  "Gift Ribbon Roll",
  "Embroidered Badge",
  "Luxury Foil Tag",
];

const categoryCycle = [
  "woven-labels",
  "woven-labels",
  "woven-labels",
  "hang-tags",
  "hang-tags",
  "hang-tags",
  "zippers-trims",
  "zippers-trims",
  "zippers-trims",
  "packaging",
  "packaging",
  "packaging",
];

export const products: Product[] = titles.map((title, i) => ({
  id: `p-${i + 1}`,
  title,
  image: img(`prod-${i + 1}`, 800, 800),
  categorySlug: categoryCycle[i]!,
  createdAt: new Date(Date.now() - i * 86_400_000).toISOString(),
}));

export const buyerLogos: BuyerLogo[] = [
  { name: "NorthPort" },
  { name: "Atlas & Co" },
  { name: "Vermilia" },
  { name: "Brightline" },
  { name: "Maison Vera" },
  { name: "Orion Wear" },
  { name: "Kestrel" },
  { name: "Studio Nord" },
  { name: "Folio" },
  { name: "Lumière" },
];

export const stats = [
  { value: 30, suffix: "+", label: "Years" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 200, suffix: "+", label: "Buyers" },
  { value: 20, suffix: "+", label: "Countries" },
];
