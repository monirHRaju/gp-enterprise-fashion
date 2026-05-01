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

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const PRODUCT_RAW = [
  {
    category: "Natureal Buckle",
    images: [
      "https://i.ibb.co.com/0VZ5S1Z8/NCSB01.png",
      "https://i.ibb.co.com/V00Jqss2/NCSB02.png",
    ],
  },
  {
    category: "Wooden Hanger",
    images: [
      "https://i.ibb.co.com/t9VkHGt/NWB01.png",
      "https://i.ibb.co.com/XrJL2cvN/NWH-02.png",
      "https://i.ibb.co.com/zT67GXQG/NWH-03.png",
      "https://i.ibb.co.com/5x4pxKrw/NWH4.png",
      "https://i.ibb.co.com/d4nmJJ8W/PWH-01.png",
    ],
  },
  {
    category: "Wooden Hair Comb",
    images: [
      "https://i.ibb.co.com/Rk7Tw6NJ/WHC-3.png",
      "https://i.ibb.co.com/NnWNwK96/WHC-4.png",
      "https://i.ibb.co.com/RpX4RfS6/WHC-5.png",
    ],
  },
  {
    category: "Bamboo Button",
    images: [
      "https://i.ibb.co.com/6c1gfKrQ/BB01.jpg",
      "https://i.ibb.co.com/Xk3Twdz2/BB03.jpg",
    ],
  },
  {
    category: "Wood Button",
    images: [
      "https://i.ibb.co.com/3yCdGR7k/WB-458.jpg",
      "https://i.ibb.co.com/zVDD2zxr/WB-566.jpg",
      "https://i.ibb.co.com/TDhv7yBR/WB-567.jpg",
      "https://i.ibb.co.com/MywvRw3d/WB-568.jpg",
      "https://i.ibb.co.com/VW0h2cmp/WB-01.jpg",
    ],
  },
  {
    category: "River Shell Button",
    images: [
      "https://i.ibb.co.com/x8sHGQHp/RS35WW.jpg",
      "https://i.ibb.co.com/Fk96b6M0/Smoke-RS35-SMK.jpg",
      "https://i.ibb.co.com/TB87xkkf/Yellow-RS35-YC.jpg",
    ],
  },
  {
    category: "Coconut Shell Button",
    images: [
      "https://i.ibb.co.com/XhZbVVq/CB-07.jpg",
      "https://i.ibb.co.com/gMXKMQrx/CB-08.jpg",
      "https://i.ibb.co.com/xKFf9FDg/CB-09.jpg",
      "https://i.ibb.co.com/0WZzPbH/CB-12.jpg",
    ],
  },
  {
    category: "Trocus Shell Button",
    images: [
      "https://i.ibb.co.com/gMMvq525/TBR-04.jpg",
      "https://i.ibb.co.com/fVBwR6Hb/TBR-08.jpg",
      "https://i.ibb.co.com/yny7b6Z5/TBR-30.jpg",
    ],
  },
  {
    category: "Wooden Beads",
    images: [
      "https://i.ibb.co.com/PGv8gQhY/WPT-226.jpg",
      "https://i.ibb.co.com/0jjYYd4p/WPTBS-02.jpg",
      "https://i.ibb.co.com/WpyHX287/WPTL-01.jpg",
      "https://i.ibb.co.com/MDHzrZh5/WPTTC-03.jpg",
    ],
  },
  {
    category: "Real Horn Scraper",
    images: [
      "https://i.ibb.co.com/bRYkhsFv/RHS-05.jpg",
      "https://i.ibb.co.com/VnWtBPc/RHS-06.jpg",
      "https://i.ibb.co.com/0R7HtKSp/RHS-07.jpg",
      "https://i.ibb.co.com/dJHPLY7Z/RHS-10.jpg",
    ],
  },
  {
    category: "Shell Beads",
    images: [
      "https://i.ibb.co.com/5X38WZRp/SB-001.jpg",
      "https://i.ibb.co.com/MxC22Ldq/SB-002.jpg",
    ],
  },
  {
    category: "Real Horn Beads",
    images: [
      "https://i.ibb.co.com/QF8wrswc/HPTL-01.jpg",
      "https://i.ibb.co.com/WNsZBtqX/HPTL-02.jpg",
    ],
  },
  {
    category: "Real Bone Button",
    images: [
      "https://i.ibb.co.com/YT7j45xS/BO-01.jpg",
      "https://i.ibb.co.com/bRWmQL5G/BO-02.jpg",
      "https://i.ibb.co.com/vxhx8cZ0/BO-03.jpg",
    ],
  },
  {
    category: "Real Horn Button",
    images: [
      "https://i.ibb.co.com/JFgTxwCz/RH-01.jpg",
      "https://i.ibb.co.com/DPQXw2cB/RH-02-B.jpg",
      "https://i.ibb.co.com/fVpwXrkd/RH-10.jpg",
    ],
  },
  {
    category: "Natural Jewellery",
    images: [
      "https://i.ibb.co.com/wFfdrtzm/NPN-01.jpg",
      "https://i.ibb.co.com/3mf9FvtG/NPN-02.jpg",
      "https://i.ibb.co.com/DHxcfVTD/NPN-04.jpg",
    ],
  },
];

export const categories: Category[] = PRODUCT_RAW.map((group) => ({
  slug: slugify(group.category),
  name: group.category,
  productCount: group.images.length,
  coverImages: group.images,
}));

export const products: Product[] = PRODUCT_RAW.flatMap((group, gIdx) =>
  group.images.map((imgUrl, i) => {
    const fileName = imgUrl.split("/").pop()?.split(".")[0] || "product";
    return {
      id: `p-${gIdx}-${i}`,
      title: `${group.category} - ${fileName}`,
      image: imgUrl,
      categorySlug: slugify(group.category),
      createdAt: new Date(Date.now() - (gIdx * 10 + i) * 86_400_000).toISOString(),
    };
  }),
);

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
  { value: 15, suffix: "+", label: "Years" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 200, suffix: "+", label: "Buyers" },
  { value: 10, suffix: "+", label: "Countries" },
];
