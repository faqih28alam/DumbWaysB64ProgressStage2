// order-model.ts
export interface Order {
  id: number;
  productId: number; // The Relation
  quantity: number;
  totalPrice?: number;
}

// Mock Database for the Challenge
export const orders: Order[] = [];