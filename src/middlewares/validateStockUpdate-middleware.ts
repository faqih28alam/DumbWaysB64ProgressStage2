// validateStockUpdate-middleware.ts
// this middleware validates the input for updating stock information

import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';

// Middleware to validate stock update input
export const validateStockUpdate = (req: Request, res: Response, next: NextFunction) => {
  let { stocksId, productId, supplierId, quantity } = req.body;

  // If stocks is not provided, but productId, supplierId, and quantity are provided, create stocks array
  if (!stocksId && productId && supplierId && typeof quantity === 'number') {
    req.body.stocksId = [
      { productId, supplierId, quantity }
    ];
    stocksId = req.body.stocksId;
  }
  // Validate stocks array
  if (!Array.isArray(stocksId) || stocksId.length === 0) {
    return next(new AppError('Invalid input: "stocksId" must be a non-empty array.', 400));
  }
  // Validate each stock item
  for (const stock of stocksId) {
    if (
      typeof stock.productId !== 'number' ||
      typeof stock.supplierId !== 'number' ||
      typeof stock.quantity !== 'number'
    ) {
      return next(new AppError('Invalid stock item data type.', 400));
    }
    // Validate quantity is not negative
    if (stock.quantity < 0) {
      return next(new AppError('Stock quantity cannot be negative.', 400));
    }
  }

  next();
};
