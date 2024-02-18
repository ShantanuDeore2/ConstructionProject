const express = require("express");
const router = express.Router();
const {
  createDimension,
  findAllDimensions,
  findDimensionById,
  updateDimension,
  deleteDimension,
} = require("../controllers/dimensionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateDimension,
} = require("../middlewares/schemaValidations/dimensionValidation");

// Create a new dimension
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDimension,
  createDimension
);

// Get a single dimension
router.get("/:id", authenticate, authorize(["admin"]), findDimensionById);

// Get all dimensions
router.get("/", authenticate, authorize(["admin"]), findAllDimensions);

// Update a dimension
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDimension,
  updateDimension
);

// Delete a dimension
router.delete("/:id", authenticate, authorize(["admin"]), deleteDimension);

module.exports = router;
