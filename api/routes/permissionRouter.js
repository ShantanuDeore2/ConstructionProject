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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new permission
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePermission,
  asyncErrorWrapper(createPermission)
);

// get a single permission
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findPermissionById)
);

// get all permissions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllPermissions)
);

// update a permission
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePermission,
  asyncErrorWrapper(updatePermission)
);

// delete a permission
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deletePermission)
);

module.exports = router;
