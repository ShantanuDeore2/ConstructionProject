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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new plan
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePlan,
  asyncErrorWrapper(createPlan)
);

// get a single plan
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findPlanById)
);

// get all plans
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllPlans)
);

// update a plan
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePlan,
  asyncErrorWrapper(updatePlan)
);

// delete a plan
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deletePlan)
);

module.exports = router;
