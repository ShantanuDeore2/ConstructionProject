const express = require("express");
const router = express.Router();
const {
  createWorkItem,
  findAllWorkItems,
  findWorkItemById,
  updateWorkItem,
  deleteWorkItem,
} = require("../controllers/workItemController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateWorkItem,
} = require("../middlewares/schemaValidations/workItemValidation");

// Create a new workItem
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkItem,
  createWorkItem
);

// Get a single workItem
router.get("/:id", authenticate, authorize(["admin"]), findWorkItemById);

// Get all workItems
router.get("/", authenticate, authorize(["admin"]), findAllWorkItems);

// Update a workItem
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkItem,
  updateWorkItem
);

// Delete a workItem
router.delete("/:id", authenticate, authorize(["admin"]), deleteWorkItem);

module.exports = router;
