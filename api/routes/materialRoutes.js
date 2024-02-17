const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateMaterial,
} = require("../middlewares/schemaValidations/materialValidation");

// create a new material
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateMaterial,
  materialController.createSingleDocument
);

// get a single material
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  materialController.readSingleDocument
);

// get all materials
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  materialController.readAllDocuments
);

// update a material
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateMaterial,
  materialController.updateSingleDocument
);

// delete a material
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  materialController.deleteSingleDocument
);

module.exports = router;
