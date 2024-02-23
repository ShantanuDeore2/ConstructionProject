const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * TransactionService
 * @description :: Business logic and services for transactions
 */
module.exports = class TransactionService {
  constructor() {
    let Transaction;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Transaction = require("../schemas/Transaction");
      DAO = require("../dao/MongoDAO");
    } else {
      Transaction = require("../schemas/Transaction");
      DAO = require("../dao/MongoDAO");
    }

    this.transactionDao = new DAO(Transaction);
  }

  // Create a new product
  async create(transactionData) {
    const transaction = await this.transactionDao.create(transactionData);
    return transaction;
  }

  // Get all transactions
  async findAll() {
    const transactions = await this.transactionDao.findAll();
    return transactions;
  }

  // Get a single product
  async findById(transactionId) {
    const transaction = await this.transactionDao.findById(transactionId);
    if (!transaction) {
      throw new NotFoundError("Transaction not found");
    }
    return transaction;
  }

  // Update a single product
  async updateById(transactionId, transactionData) {
    const transaction = await this.transactionDao.updateById(
      transactionId,
      transactionData
    );
    if (!transaction) {
      throw NotFoundError("Transaction not found");
    }
    return transaction;
  }

  // Delete a single product
  async deleteById(transactionId) {
    await this.transactionDao.deleteById(transactionId);
  }

  // Other complex business logics
};
