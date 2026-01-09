// supplier-controller.ts
import { Request, Response } from 'express';
import { prisma } from '../connection/client';
import AppError from '../utils/app-error';


// Controller to CREATE a new supplier
export const createSupplier = async (req: Request, res: Response, next: any) => {
    try {
        const { email, password } = req.body;

        // Check if the supplier already exists
        const existingSupplier = await prisma.supplier.findUnique({ where: { email } });
        if (existingSupplier) { throw new AppError('Supplier already exists. please try with another email!', 409); }

        const newSupplier = await prisma.supplier.create({
            data: {
                email,
                password
            },
        });
        res.status(201).json({ message: "Supplier created successfully", data: newSupplier });
    } catch (error) {
        next(error);
    }
};

// Controller to GET all suppliers
export const getSuppliers = async (req: Request, res: Response, next: any) => {
    try {    
        const suppliers = await prisma.supplier.findMany();
        res.status(200).json({ Message: "Suppliers fetched successfully. Showed all suppliers Data.", data: suppliers });
    } catch (error) {
        next(error);
    }
};

// Controller to UPDATE a supplier by ID
export const updateSupplier = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;

        // Check if the supplier exists
        const supplier = await prisma.supplier.findUnique({ where: { id: Number(id) } });
        if (!supplier) { throw new AppError('Supplier not found', 404); }

        const { email, password } = req.body;
        const updatedSupplier = await prisma.supplier.update({
            where: { id: Number(id) },
            data: {
                email,
                password
            },
        });
        res.status(200).json({ Message: "Supplier updated successfully", data: updatedSupplier });
    } catch (error) {
        next(error);
    }
};

// Controller to DELETE a supplier by ID
export const deleteSupplier = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;
        
        // Check if the supplier exists
        const supplier = await prisma.supplier.findUnique({ where: { id: Number(id) } });
        if (!supplier) { throw new AppError('Supplier not found', 404);}

        const deletedSupplier = await prisma.supplier.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ Message: "Supplier deleted successfully", data: deletedSupplier });
    } catch (error) {
        next(error);
    }
};

// Controller to GET all stocks
export const getStocks = async (req: Request, res: Response, next: any) => {
    try {
        const stocks = await prisma.stock.findMany();
        res.status(200).json({ Message: "Stocks fetched successfully. Showed all stocks Data.", data: stocks });
    } catch (error) {
        next(error);
    }
};

// Controller to UPDATE stock using batch query
export const updateStock = async (req: Request, res: Response, next: any) => {
    const { stocksId } = req.body;
    try {
        const updatedStock = await prisma.$transaction(async (tx) => {
            const result = [];
            for (const stockUpdate of stocksId) {
                const { productId, supplierId, quantity } = stockUpdate;

                // Check if quantity is negative
                if (quantity < 0) { throw new AppError('Stock quantity cannot be negative', 400);}
                
                // check if supplier exists
                const supplier = await tx.supplier.findUnique({ where: { id: supplierId } });
                if (!supplier) { throw new AppError('Supplier not found', 404); }

                // check if product exists
                const product = await tx.product.findUnique({ where: { id: productId } });
                if (!product) { throw new AppError('Product not found', 404); }
                
                // update stock
                const updatedStock = await tx.stock.updateMany({
                    where: { supplierId, productId },
                    data: {
                        quantity: {
                            increment: quantity
                        }
                    },
                });
                
                if (updatedStock.count === 0) {

                    const newStock = await tx.stock.create({
                        data: {
                            productId,
                            supplierId,
                            quantity
                        },
                    });
                    result.push(newStock);
                }else {
                    result.push(updatedStock);
                }

            }
            return result;
        });
        res.status(200).json({ Message: "Stock updated successfully", data: updatedStock });
    } catch (error) {
        next(error);
    }
};
