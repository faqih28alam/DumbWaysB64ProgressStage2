import { request, response } from "express";
import { orders, Order } from "../models/order-model"
import { products, Product } from '../models/product-model';

export const createOrder = (req = request, res = response) => { 
  const { productId, quantity } = req.body;

  // 1. Validation: Does the product exist?
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  // 2. Create the Order logic
  const newOrder: Order = {
    id: orders.length + 1,
    productId,
    quantity,
    totalPrice: product.price * quantity
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Added to cart", data: newOrder });
};

export const getAllOrders = (req = request, res = response) => {
  // Bonus: Mapping orders to include Product details (Join logic)
  const detailedOrders = orders.map(order => ({
    ...order,
    product: products.find(p => p.id === order.productId)
  }));
  
  res.json(detailedOrders);
};

// Additional controller functions Delete
export const deleteOrder = (req = request, res = response) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(order => order.id === id);

  if (index !== -1) {
    orders.splice(index, 1);
    res.json({
      ok: true,
      message: "Order deleted successfully"
    });
  } else {
    res.status(404).json({
      ok: false,
      message: "Order not found"
    });
  }
}

// Additional controller functions Update
export const updateOrder = (req = request, res = response) => {
  const id = Number(req.params.id);
  const { productId, quantity } = req.body;
  const order = orders.find(order => order.id === id);

  if (order) {
    order.productId = productId;
    order.quantity = quantity;
    res.json({
      ok: true,
      message: "Order updated successfully",
      order
    });
  } else {
    res.status(404).json({
      ok: false,
      message: "Order not found"
    });
  }
};