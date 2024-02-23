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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new execution
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateExecution,
  asyncErrorWrapper(createExecution)
);

// get a single execution
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findExecutionById)
);

// get all executions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllExecutions)
);

// update a execution
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateExecution,
  asyncErrorWrapper(updateExecution)
);

// delete a execution
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteExecution)
);

module.exports = router;
