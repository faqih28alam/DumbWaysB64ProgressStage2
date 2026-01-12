// product-validation.ts
// price must be a positive number and name must be a non-empty string, product name must be at least 3 characters long
import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().positive().required(),
});
