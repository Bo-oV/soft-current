export type ProductGalleryItem = string | { image: string };

export type Product = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  sizes: string;
  composition: string;
  oldPrice?: number;
  price: number;
  currency?: string;
  mainImage?: string;
  gallery?: ProductGalleryItem[];
  available?: boolean;
  popular?: boolean;
  customOrderAvailable?: boolean;
  buttonText?: string;
  customOrderText?: string;
};
