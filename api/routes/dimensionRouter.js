const express = require("express");
const router = express.Router();
const {
  createDimension,
  findAllDimensions,
  findDimensionById,
  updateDimension,
  deleteDimension,
} = require("../controllers/dimensionController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateDimension,
} = require("../middlewares/schemaValidations/dimensionValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new dimension
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDimension,
  asyncErrorWrapper(createDimension)
);

// get a single dimension
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findDimensionById)
);

// get all dimensions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllDimensions)
);

// update a dimension
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDimension,
  asyncErrorWrapper(updateDimension)
);

// delete a dimension
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteDimension)
);

module.exports = router;
