import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// ✅ Register new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    // Create new admin
    const admin = await Admin.create({ name, email, password });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Verify password
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
