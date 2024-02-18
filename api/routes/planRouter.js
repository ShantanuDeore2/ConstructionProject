const express = require("express");
const router = express.Router();
const {
  createPlan,
  findAllPlans,
  findPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validatePlan,
} = require("../middlewares/schemaValidations/planValidation");

// Create a new plan
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePlan,
  createPlan
);

// Get a single plan
router.get("/:id", authenticate, authorize(["admin"]), findPlanById);

// Get all plans
router.get("/", authenticate, authorize(["admin"]), findAllPlans);

// Update a plan
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePlan,
  updatePlan
);

// Delete a plan
router.delete("/:id", authenticate, authorize(["admin"]), deletePlan);

module.exports = router;
