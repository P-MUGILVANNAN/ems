import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB(); // Initialize MongoDB connection

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));

// routes and other middlewares go here
app.use("/api/auth", authRoutes);

// Protected employee routes
app.use("/api/employees", employeeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
