const express = require("express");
const router = express.Router();
const {
  createMaterialDetail,
  findAllMaterialDetails,
  findMaterialDetailById,
  updateMaterialDetail,
  deleteMaterialDetail,
} = require("../controllers/materialDetailController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateMaterialDetails,
} = require("../middlewares/schemaValidations/materialDetailValidation");

// Create a new materialDetail
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateMaterialDetails,
  createMaterialDetail
);

// Get a single materialDetail
router.get("/:id", authenticate, authorize(["admin"]), findMaterialDetailById);

// Get all materialDetails
router.get("/", authenticate, authorize(["admin"]), findAllMaterialDetails);

// Update a materialDetail
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateMaterialDetails,
  updateMaterialDetail
);

// Delete a materialDetail
router.delete("/:id", authenticate, authorize(["admin"]), deleteMaterialDetail);

module.exports = router;
