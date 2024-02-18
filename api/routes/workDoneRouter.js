const express = require("express");
const router = express.Router();
const {
  createWorkDone,
  findAllWorkDones,
  findWorkDoneById,
  updateWorkDone,
  deleteWorkDone,
} = require("../controllers/workDoneController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateWorkDone,
} = require("../middlewares/schemaValidations/workDoneValidation");

// Create a new workDone
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkDone,
  createWorkDone
);

// Get a single workDone
router.get("/:id", authenticate, authorize(["admin"]), findWorkDoneById);

// Get all workDones
router.get("/", authenticate, authorize(["admin"]), findAllWorkDones);

// Update a workDone
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkDone,
  updateWorkDone
);

// Delete a workDone
router.delete("/:id", authenticate, authorize(["admin"]), deleteWorkDone);

module.exports = router;
