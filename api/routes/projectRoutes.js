const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateProject,
} = require("../middlewares/schemaValidations/projectValidation");

// create a new project
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateProject,
  projectController.createSingleDocument
);

// get a single project
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  projectController.readSingleDocument
);

// get all projects
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  projectController.readAllDocuments
);

// update a project
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateProject,
  projectController.updateSingleDocument
);

// delete a project
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  projectController.deleteSingleDocument
);

module.exports = router;
