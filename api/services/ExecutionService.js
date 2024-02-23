const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * ExecutionService
 * @description :: Business logic and services for executions
 */
module.exports = class ExecutionService {
  constructor() {
    let Execution;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Execution = require("../schemas/Execution");
      DAO = require("../dao/MongoDAO");
    } else {
      Execution = require("../schemas/Execution");
      DAO = require("../dao/MongoDAO");
    }

    this.executionDao = new DAO(Execution);
  }

  // Create a new product
  async create(executionData) {
    const execution = await this.executionDao.create(executionData);
    return execution;
  }

  // Get all executions
  async findAll() {
    const executions = await this.executionDao.findAll();
    return executions;
  }

  // Get a single product
  async findById(executionId) {
    const execution = await this.executionDao.findById(executionId);
    if (!execution) {
      throw new NotFoundError("Execution not found");
    }
    return execution;
  }

  // Update a single product
  async updateById(executionId, executionData) {
    const execution = await this.executionDao.updateById(
      executionId,
      executionData
    );
    if (!execution) {
      throw NotFoundError("Execution not found");
    }
    return execution;
  }

  // Delete a single product
  async deleteById(executionId) {
    await this.executionDao.deleteById(executionId);
  }

  // Other complex business logics
};
