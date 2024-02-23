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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new transaction
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateTransaction,
  asyncErrorWrapper(createTransaction)
);

// get a single transaction
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findTransactionById)
);

// get all transactions
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllTransactions)
);

// update a transaction
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateTransaction,
  asyncErrorWrapper(updateTransaction)
);

// delete a transaction
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteTransaction)
);

module.exports = router;
