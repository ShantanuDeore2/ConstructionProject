const express = require("express");
const router = express.Router();
const {
  createWorkType,
  findAllWorkTypes,
  findWorkTypeById,
  updateWorkType,
  deleteWorkType,
} = require("../controllers/workTypeController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateWorkType,
} = require("../middlewares/schemaValidations/workTypeValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new worktype
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkType,
  asyncErrorWrapper(createWorkType)
);

// get a single worktype
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findWorkTypeById)
);

// get all worktypes
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllWorkTypes)
);

// update a worktype
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkType,
  asyncErrorWrapper(updateWorkType)
);

// delete a worktype
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteWorkType)
);

module.exports = router;
