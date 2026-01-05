// IMPORT EXPRESS
import express, { Application, Request, Response } from 'express';
import productRoutes from './routes/product-route'; //import product routes
import orderRoutes from './routes/order-route';     //import order routes

const app: Application = express();
const PORT = 3000;

// Middleware to parse JSON bodies (Crucial for Postman POST requests)
app.use(express.json());

// Routes
app.use('/apiproducts', productRoutes);
app.use('/apiorders', orderRoutes);

// Health Check / Welcome Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Shopping Cart API!');
});

app.listen(PORT, () => {    // Start server and listen on specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log message when server starts
});