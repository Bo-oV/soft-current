import productsData from "./products.json";
import type { Product } from "../types/product";

type ProductsData = {
  items?: Product[];
};

export const products = (productsData as ProductsData).items ?? [];
