const express = require("express");
const router = express.Router();
const dimensionController = require("../controllers/dimensionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateDimension,
} = require("../middlewares/schemaValidations/dimensionValidation");

// create a new dimension
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDimension,
  dimensionController.createSingleDocument
);

// get a single dimension
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  dimensionController.readSingleDocument
);

// get all dimensions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  dimensionController.readAllDocuments
);

// update a dimension
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDimension,
  dimensionController.updateSingleDocument
);

// delete a dimension
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  dimensionController.deleteSingleDocument
);

module.exports = router;
