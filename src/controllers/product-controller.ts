import { Request, Response } from "express";
import { products, Product } from "../models/product-model";
import { prisma } from "../connection/client";

// Controller functions for Read products
export const getProducts = async (req: Request, res: Response) => {
    // Implement Pagination, Filtering, Sorting (for Day 3 tasks)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;                          // offset is how many items to skip

    try {
        const products = await prisma.product.findMany({
            skip: offset,
            take: limit,
            // Sorting
            orderBy: {
                name: 'asc' // Example: sort by name ascending
            }
            // Filtering can be added here based on query parameters
        });
        res.status(200).json({
            message: "Products fetched successfully",
            data: products,
            metadata: {
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Controller functions for Create Product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body;
        const newProduct = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price)
            },
        });
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Additional controller functions Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await prisma.product.delete({
            where: { id }
        });
        res.status(200).json({
            ok: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

// Additional controller functions Update Product
export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                price: parseFloat(price),
            }
        });
        res.status(200).json({
            ok: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

