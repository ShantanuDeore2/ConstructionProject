const express = require("express");
const router = express.Router();
const executionController = require("../controllers/executionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateExecution,
} = require("../middlewares/schemaValidations/executionValidation");

// create a new execution
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateExecution,
  executionController.createSingleDocument
);

// get a single execution
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  executionController.readSingleDocument
);

// get all executions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  executionController.readAllDocuments
);

// update a execution
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateExecution,
  executionController.updateSingleDocument
);

// delete a execution
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  executionController.deleteSingleDocument
);

module.exports = router;
