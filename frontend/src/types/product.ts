// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  old_price?: number;
  image: string;
}
