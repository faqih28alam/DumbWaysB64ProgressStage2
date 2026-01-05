// product-model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

// Mock Database for the Challenge
export const products: Product[] = [];