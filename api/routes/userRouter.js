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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new user
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateUser,
  asyncErrorWrapper(createUser)
);

// get a single user
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findUserById)
);

// get all users
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllUsers)
);

// update a user
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateUser,
  asyncErrorWrapper(updateUser)
);

// delete a user
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteUser)
);

module.exports = router;
