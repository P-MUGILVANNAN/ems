import express from "express";
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   POST /api/employees
// @desc    Add a new employee
router.post("/", addEmployee);

// @route   GET /api/employees
// @desc    Get all employees with optional filters
router.get("/", getEmployees);

// @route   GET /api/employees/:id
// @desc    Get a single employee by ID
router.get("/:id", getEmployeeById);

// @route   PUT /api/employees/:id
// @desc    Update an employee
router.put("/:id", updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete an employee
router.delete("/:id", deleteEmployee);

export default router;
