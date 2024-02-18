const express = require("express");
const router = express.Router();
const {
  createPermission,
  findAllPermissions,
  findPermissionById,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");
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
  createPermission
);

// get a single permission
router.get("/:id", authenticate, authorize(["admin"]), findPermissionById);

// get all permissions
router.get("/", authenticate, authorize(["admin"]), findAllPermissions);

// update a permission
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePermission,
  updatePermission
);

// delete a permission
router.delete("/:id", authenticate, authorize(["admin"]), deletePermission);

module.exports = router;
