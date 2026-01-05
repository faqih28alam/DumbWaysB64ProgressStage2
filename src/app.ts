// IMPORT EXPRESS
import express from "express";
import router from './routes/post-route'; // Import post routes

const app = express();      // Set variable to hold express
const PORT = 3000;          // Set port number

app.use(express.json());    // Middleware to parse JSON bodies
app.use("/api/v1", router); // Use post routes with specified prefix

app.listen(PORT, () => {    // Start server and listen on specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log message when server starts
});