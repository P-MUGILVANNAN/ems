import mongoose from "mongoose";

// Enum for Department
const departments = ["Engineering", "HR", "Marketing", "Sales", "Finance", "Operations"];

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Employee email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Employee phone number is required"],
      trim: true,
    },
    department: {
      type: String,
      enum: departments,
      default: "Engineering",
      required: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
