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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new project
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateProject,
  asyncErrorWrapper(createProject)
);

// get a single project
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findProjectById)
);

// get all projects
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllProjects)
);

// update a project
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateProject,
  asyncErrorWrapper(updateProject)
);

// delete a project
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteProject)
);

module.exports = router;
