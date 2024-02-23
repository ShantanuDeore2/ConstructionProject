const TransactionService = require("../services/TransactionService");
const logger = require("../../utils/logger");
const transactionService = new TransactionService();

// Create a new transaction
exports.createTransaction = async (req, res, next) => {
  const doc = await transactionService.create(req.body);
  logger.info(`Transaction ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single transaction
exports.findTransactionById = async (req, res, next) => {
  const doc = await transactionService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all transactions
exports.findAllTransactions = async (req, res, next) => {
  const docs = await transactionService.findAll();
  res.status(200).json(docs);
};

// Update a transaction
exports.updateTransaction = async (req, res, next) => {
  const doc = await transactionService.updateById(req.params.id, req.body);
  logger.info(`Transaction ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a transaction
exports.deleteTransaction = async (req, res, next) => {
  await transactionService.deleteById(req.params.id);
  logger.info(`Transaction ${req.params.id} deleted`);
  res.status(204).send();
};
