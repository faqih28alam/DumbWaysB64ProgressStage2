import { request, response } from "express";
import { orders, Order } from "../models/order-model";
import { products } from '../models/product-model';
import { prisma } from "../connection/client";

// Controller functions to CREATE order
export const createOrder = async (req = request, res = response) => { 
  try {
    const { productId, quantity } = req.body;
    // Validation: Does the product exist?
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    // Create the Order logic
    const newOrder: Order = {
      id: orders.length + 1,
      productId,
      quantity,
      totalPrice: product.price * quantity
    };
    orders.push(newOrder);
    res.status(201).json({ message: "Added to cart", data: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Controller functions to READ orders
export const getOrders = async (req = request, res = response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  try { 
    const grouped = await prisma.order.groupBy({
      by: ['userId'],
      _sum: { quantity: true },
      orderBy: { userId: 'asc' },
      take: limit,
      skip: offset
    });

  res.status(200).json({ Message: "Orders fetched successfully", grouped });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Controller functions to DELETE order
export const deleteOrder = async (req = request, res = response) => {
  try {
    const id = Number(req.params.id);
    await prisma.order.delete({ where: { id } });
    res.status(200).json({
      ok: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

// Controller functions to Update order
export const updateOrder = async (req = request, res = response) => {
  try {
    const id = Number(req.params.id);
    const { productId, quantity } = req.body;
    await prisma.order.update({ where: { id }, data: { productId, quantity } });
    res.status(200).json({
      ok: true,
      message: "Order updated successfully"
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};
