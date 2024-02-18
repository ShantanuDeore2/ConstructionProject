const express = require("express");
const router = express.Router();
const {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateUser,
} = require("../middlewares/schemaValidations/userValidation");

// Create a new user
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateUser,
  createUser
);

// Get a single user
router.get("/:id", authenticate, authorize(["admin"]), findUserById);

// Get all users
router.get("/", authenticate, authorize(["admin"]), findAllUsers);

// Update a user
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateUser,
  updateUser
);

// Delete a user
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

module.exports = router;
