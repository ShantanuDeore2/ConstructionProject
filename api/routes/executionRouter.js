const express = require("express");
const router = express.Router();
const {
  createExecution,
  findAllExecutions,
  findExecutionById,
  updateExecution,
  deleteExecution,
} = require("../controllers/executionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateExecution,
} = require("../middlewares/schemaValidations/executionValidation");

// Create a new execution
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateExecution,
  createExecution
);

// Get a single execution
router.get("/:id", authenticate, authorize(["admin"]), findExecutionById);

// Get all executions
router.get("/", authenticate, authorize(["admin"]), findAllExecutions);

// Update a execution
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateExecution,
  updateExecution
);

// Delete a execution
router.delete("/:id", authenticate, authorize(["admin"]), deleteExecution);

module.exports = router;
