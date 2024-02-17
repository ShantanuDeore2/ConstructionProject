const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validatePermission,
} = require("../middlewares/schemaValidations/permissionValidation");

// create a new permission
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePermission,
  permissionController.createSingleDocument
);

// get a single permission
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  permissionController.readSingleDocument
);

// get all permissions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  permissionController.readAllDocuments
);

// update a permission
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePermission,
  permissionController.updateSingleDocument
);

// delete a permission
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  permissionController.deleteSingleDocument
);

module.exports = router;
