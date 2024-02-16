const express = require("express");
const router = express.Router();
const {
  createPermission,
  getPermissions,
} = require("../controllers/permissionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validatePermission,
} = require("../middlewares/schemaValidations/permissionValidation");

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePermission,
  createPermission
);

router.get("/", authenticate, authorize(["admin"]), getPermissions);

module.exports = router;
