// IMPORT EXPRESS
import express, { Request, Response } from 'express';
import postRoutes from './routes/post-route'; // Import post routes

const app = express();      // Set variable to hold express

app.use(express.json());    // Middleware to parse JSON bodies
app.use('/api/v1', postRoutes); // Use post routes with specified prefix

// Health Check / Welcome Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Blog API!');
});

app.listen(process.env.PORT || 3000, () => {    // Start server and listen on specified port
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`); // Log message when server starts
});