const express = require("express");
const router = express.Router();
const {
  createDepartment,
  findAllDepartments,
  findDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateDepartment,
} = require("../middlewares/schemaValidations/departmentValidation");

// Create a new department
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDepartment,
  createDepartment
);

// Get a single department
router.get("/:id", authenticate, authorize(["admin"]), findDepartmentById);

// Get all departments
router.get("/", authenticate, authorize(["admin"]), findAllDepartments);

// Update a department
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDepartment,
  updateDepartment
);

// Delete a department
router.delete("/:id", authenticate, authorize(["admin"]), deleteDepartment);

module.exports = router;
