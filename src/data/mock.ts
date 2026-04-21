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
  phone: "+880 1715427822",
  phone2: "+880 1839953050",
  email: "sakawathossain773@gmail.com",
  address: ["Hossain Market, Ahasan Mollah Road, Tongi, Gazipur"],
  social: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/8801715427822",
  },
};
const img2 = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const img = (seed: string, w = 800, h = 800) =>
  `https://i.ibb.co.com/${seed}/${w}/${h}`;
// https://i.ibb.co.com/rK6b1qz0/img-3.jpg
// https://i.ibb.co.com/jZQyrWnf/img-8.jpg
// https://i.ibb.co.com/vvmybhC9/img-24.jpg
// https://i.ibb.co.com/XxY3B7bB/img-37.jpg
// https://i.ibb.co.com/GvxF7JqB/img-52.jpg
// https://i.ibb.co.com/2Y81YFm7/img-54.jpg
// https://i.ibb.co.com/d0BXykmB/img-57.jpg
// https://i.ibb.co.com/MDXRNG7b/img-70.jpg
// https://i.ibb.co.com/bDdpQ9F/img-76.jpg
// https://i.ibb.co.com/ZR07byPw/img-80.jpg

// https://i.ibb.co.com/Pz3SccS0/img-60.jpg
// https://i.ibb.co.com/9k9mw4pq/img-62.jpg
// https://i.ibb.co.com/Kz75sPyQ/img-63.jpg
// https://i.ibb.co.com/BH5S0HmK/img-82.jpg
// https://i.ibb.co.com/JF8FGj2J/img-83.jpg
// https://i.ibb.co.com/yBVNSwv2/img-85.jpg
// https://i.ibb.co.com/SDW2G5Rj/img-94.jpg
// https://i.ibb.co.com/FqcW9QDH/img-97.jpg
// https://i.ibb.co.com/nq9pR9n0/img-98.jpg

export const categories: Category[] = [
  {
    slug: "woven-labels",
    name: "Woven Labels",
    productCount: 48,
    coverImages: [
      img("rK6b1qz0/img-3.jpg", 900, 700),
      img("jZQyrWnf/img-8.jpg", 900, 700),
      img("vvmybhC9/img-24.jpg", 900, 700),
    ],
  },
  {
    slug: "hang-tags",
    name: "Hang Tags",
    productCount: 36,
    coverImages: [
      img("XxY3B7bB/img-37.jpg", 900, 700),
      img("GvxF7JqB/img-52.jpg", 900, 700),
      img("d0BXykmB/img-57.jpg", 900, 700),
      img("4wTXPbNp/img-55.jpg", 900, 700),
    ],
  },
  {
    slug: "zippers-trims",
    name: "Zippers & Trims",
    productCount: 52,
    coverImages: [
      img("Pz3SccS0/img-60.jpg", 900, 700),
      img("9k9mw4pq/img-62.jpg", 900, 700),
      img("Kz75sPyQ/img-63.jpg", 900, 700),
      img("BH5S0HmK/img-82.jpg", 900, 700),
    ],
  },
  {
    slug: "packaging",
    name: "Packaging",
    productCount: 24,
    coverImages: [
      img("BH5S0HmK/img-82.jpg", 900, 700),
      img("JF8FGj2J/img-83.jpg", 900, 700),
      img("yBVNSwv2/img-85.jpg", 900, 700),
      img("nq9pR9n0/img-98.jpg", 900, 700),
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
  image: img2(`prod-${i + 1}`, 800, 800),
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
