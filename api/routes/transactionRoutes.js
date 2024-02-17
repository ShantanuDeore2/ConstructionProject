const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateTransaction,
} = require("../middlewares/schemaValidations/transactionValidation");

// create a new transaction
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateTransaction,
  transactionController.createSingleDocument
);

// get a single transaction
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  transactionController.readSingleDocument
);

// get all transactions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  transactionController.readAllDocuments
);

// update a transaction
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateTransaction,
  transactionController.updateSingleDocument
);

// delete a transaction
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  transactionController.deleteSingleDocument
);

module.exports = router;
