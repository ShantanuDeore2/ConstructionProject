const express = require("express");
const router = express.Router();
const {
  createMaterial,
  findAllMaterials,
  findMaterialById,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateMaterial,
} = require("../middlewares/schemaValidations/materialValidation");

// Create a new material
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateMaterial,
  createMaterial
);

// Get a single material
router.get("/:id", authenticate, authorize(["admin"]), findMaterialById);

// Get all materials
router.get("/", authenticate, authorize(["admin"]), findAllMaterials);

// Update a material
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateMaterial,
  updateMaterial
);

// Delete a material
router.delete("/:id", authenticate, authorize(["admin"]), deleteMaterial);

module.exports = router;
