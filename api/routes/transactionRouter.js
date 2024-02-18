const express = require("express");
const router = express.Router();
const {
  createTransaction,
  findAllTransactions,
  findTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateTransaction,
} = require("../middlewares/schemaValidations/transactionValidation");

// Create a new transaction
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateTransaction,
  createTransaction
);

// Get a single transaction
router.get("/:id", authenticate, authorize(["admin"]), findTransactionById);

// Get all transactions
router.get("/", authenticate, authorize(["admin"]), findAllTransactions);

// Update a transaction
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateTransaction,
  updateTransaction
);

// Delete a transaction
router.delete("/:id", authenticate, authorize(["admin"]), deleteTransaction);

module.exports = router;
