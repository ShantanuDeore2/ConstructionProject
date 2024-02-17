const express = require("express");
const router = express.Router();
const materialDetailController = require("../controllers/materialDetailController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateMaterialDetail,
} = require("../middlewares/schemaValidations/materialDetailValidation");

// create a new materialDetail
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateMaterialDetail,
  materialDetailController.createSingleDocument
);

// get a single materialDetail
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  materialDetailController.readSingleDocument
);

// get all materialDetails
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  materialDetailController.readAllDocuments
);

// update a materialDetail
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateMaterialDetail,
  materialDetailController.updateSingleDocument
);

// delete a materialDetail
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  materialDetailController.deleteSingleDocument
);

module.exports = router;
