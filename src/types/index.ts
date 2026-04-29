export interface ImageAsset {
  url: string;
  publicId: string;
}

export interface IProduct {
  _id: string;
  title: string;
  images: ImageAsset[];
  category: ICategory | string;
  isNewArrival: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImages: ImageAsset[];
  isActive?: boolean;
}

export interface ISliderImage {
  _id: string;
  imageUrl: string;
  publicId: string;
  order: number;
}

export type PageKey = "about" | "quality" | "buyers" | "home-features";

export interface IPageContent {
  _id: string;
  page: PageKey;
  title?: string;
  body?: string;
  images: ImageAsset[];
}

export interface IContactInfo {
  _id: string;
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  linkedin?: string;
  whatsapp?: string;
}

export interface IBuyer {
  _id: string;
  name: string;
  country?: string;
  logo?: ImageAsset;
  order: number;
}
