import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new admin
router.post("/register", registerAdmin);

// @route   POST /api/auth/login
// @desc    Login admin and return token
router.post("/login", loginAdmin);

export default router;
