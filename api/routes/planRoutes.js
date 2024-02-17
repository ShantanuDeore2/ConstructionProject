const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validatePlan,
} = require("../middlewares/schemaValidations/planValidation");

// create a new plan
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePlan,
  planController.createSingleDocument
);

// get a single plan
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  planController.readSingleDocument
);

// get all plans
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  planController.readAllDocuments
);

// update a plan
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePlan,
  planController.updateSingleDocument
);

// delete a plan
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  planController.deleteSingleDocument
);

module.exports = router;
