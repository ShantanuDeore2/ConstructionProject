const express = require("express");
const router = express.Router();
const {
  createWorkType,
  findAllWorkTypes,
  findWorkTypeById,
  updateWorkType,
  deleteWorkType,
} = require("../controllers/workTypeController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateWorkType,
} = require("../middlewares/schemaValidations/workTypeValidation");

// Create a new workType
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkType,
  createWorkType
);

// Get a single workType
router.get("/:id", authenticate, authorize(["admin"]), findWorkTypeById);

// Get all workTypes
router.get("/", authenticate, authorize(["admin"]), findAllWorkTypes);

// Update a workType
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkType,
  updateWorkType
);

// Delete a workType
router.delete("/:id", authenticate, authorize(["admin"]), deleteWorkType);

module.exports = router;
