const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateDepartment,
} = require("../middlewares/schemaValidations/departmentValidation");

// create a new department
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDepartment,
  departmentController.createSingleDocument
);

// get a single department
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  departmentController.readSingleDocument
);

// get all departments
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  departmentController.readAllDocuments
);

// update a department
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDepartment,
  departmentController.updateSingleDocument
);

// delete a department
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  departmentController.deleteSingleDocument
);

module.exports = router;
