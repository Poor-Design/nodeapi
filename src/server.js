import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import dotenv from "dotenv";

dotenv.config();


const mongoDb_URI = process.env.mongoDb_URI;
const PORT = process.env.PORT || 5002;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "server is live" });
});

// Routes
app.use("/api/notes", noteRoutes);

// MongoDB connection
mongoose
  .connect(mongoDb_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

