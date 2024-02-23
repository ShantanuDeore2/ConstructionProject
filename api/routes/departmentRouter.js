const express = require("express");
const router = express.Router();
const {
  createDepartment,
  findAllDepartments,
  findDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateDepartment,
} = require("../middlewares/schemaValidations/departmentValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new department
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDepartment,
  asyncErrorWrapper(createDepartment)
);

// get a single department
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findDepartmentById)
);

// get all departments
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllDepartments)
);

// update a department
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDepartment,
  asyncErrorWrapper(updateDepartment)
);

// delete a department
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteDepartment)
);

module.exports = router;
