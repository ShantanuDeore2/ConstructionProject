const TransactionService = require("../services/TransactionService");
const logger = require("../../utils/logger");
const transactionService = new TransactionService();

// Create a new transaction
exports.createTransaction = async (req, res, next) => {
  try {
    const doc = await transactionService.create(req.body);
    logger.info(`Transaction ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating transaction", { error: error.message });
    next(error);
  }
};

// Get a single transaction
exports.findTransactionById = async (req, res, next) => {
  try {
    const doc = await transactionService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading transaction", { error: error.message });
    next(error);
  }
};

// Get all transactions
exports.findAllTransactions = async (req, res, next) => {
  try {
    const docs = await transactionService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all transactions", { error: error.message });
    next(error);
  }
};

// Update a transaction
exports.updateTransaction = async (req, res, next) => {
  try {
    const doc = await transactionService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating transaction", { error: error.message });
    next(error);
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res, next) => {
  try {
    await transactionService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting transaction", { error: error.message });
    next(error);
  }
};
