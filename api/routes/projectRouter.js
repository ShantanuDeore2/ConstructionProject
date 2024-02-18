const express = require("express");
const router = express.Router();
const {
  createProject,
  findAllProjects,
  findProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateProject,
} = require("../middlewares/schemaValidations/projectValidation");

// Create a new project
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateProject,
  createProject
);

// Get a single project
router.get("/:id", authenticate, authorize(["admin"]), findProjectById);

// Get all projects
router.get("/", authenticate, authorize(["admin"]), findAllProjects);

// Update a project
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateProject,
  updateProject
);

// Delete a project
router.delete("/:id", authenticate, authorize(["admin"]), deleteProject);

module.exports = router;
