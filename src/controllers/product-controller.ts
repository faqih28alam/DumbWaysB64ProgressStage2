import { request, response } from "express";
import { products, Product } from "../models/product-model";

export const getAllProducts = (req = request, res = response) => {
    res.json({
        products: products
    });
}

export const createProducts = (req = request, res = response) => {
    const { name, price } = req.body;

    const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
    };

    products.push(newProduct);
    res.json({
        ok: true,
        product: newProduct
    }); 
}

// Additional controller functions Delete 
export const deleteProduct = (req = request, res = response) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        products.splice(index, 1);
        res.json({
            ok: true,
            message: "Product deleted successfully"
        });
    } else {
        res.status(404).json({
            ok: false,
            message: "Product not found"
        });
    }
}

// Additional controller functions Update
export const updateProduct = (req = request, res = response) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    const product = products.find(product => product.id === id);

    if (product) {
        product.name = name;
        product.price = price;
        res.json({
            ok: true,
            message: "Product updated successfully",
            product
        });
    } else {
        res.status(404).json({
            ok: false,
            message: "Product not found"
        });
    }
}   