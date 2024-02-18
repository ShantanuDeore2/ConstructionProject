/**
 * TransactionService
 * @description :: Business logic and services for Transaction
 */
module.exports = class TransactionService {
  constructor() {
    let Transaction = require("../schemas/Transaction");
    let MongoDao = require("../dao/MongoDAO");
    this.transactionDao = new MongoDao(Transaction);
  }

  // Create a new transaction
  async create(transactionData) {
    const transaction = await this.transactionDao.create(transactionData);
    return transaction;
  }

  // Get all Transactions
  async findAll() {
    const transactions = await this.transactionDao.findAll();
    return transactions;
  }

  // Get a single transaction
  async findById(transactionId) {
    const transaction = await this.transactionDao.findById(transactionId);
    return transaction;
  }

  // Update a single transaction
  async updateById(transactionId, transactionData) {
    const transaction = await this.transactionDao.updateById(
      transactionId,
      transactionData
    );
    return transaction;
  }

  // Delete a single transaction
  async deleteById(transactionId) {
    await this.transactionDao.deleteById(transactionId);
  }

  // Other complex business logics
};
