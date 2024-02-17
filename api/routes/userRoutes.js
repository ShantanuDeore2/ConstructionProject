const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateUser,
} = require("../middlewares/schemaValidations/userValidation");

// create a new user
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateUser,
  userController.createSingleDocument
);

// get a single user
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.readSingleDocument
);

// get all users
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  userController.readAllDocuments
);

// update a user
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateUser,
  userController.updateSingleDocument
);

// delete a user
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteSingleDocument
);

module.exports = router;
