/**
 * ExecutionService
 * @description :: Business logic and services for Execution
 */
module.exports = class ExecutionService {
  constructor() {
    let Execution = require("../schemas/Execution");
    let MongoDao = require("../dao/MongoDAO");
    this.executionDao = new MongoDao(Execution);
  }

  // Create a new execution
  async create(executionData) {
    const execution = await this.executionDao.create(executionData);
    return execution;
  }

  // Get all Executions
  async findAll() {
    const executions = await this.executionDao.findAll();
    return executions;
  }

  // Get a single execution
  async findById(executionId) {
    const execution = await this.executionDao.findById(executionId);
    return execution;
  }

  // Update a single execution
  async updateById(executionId, executionData) {
    const execution = await this.executionDao.updateById(
      executionId,
      executionData
    );
    return execution;
  }

  // Delete a single execution
  async deleteById(executionId) {
    await this.executionDao.deleteById(executionId);
  }

  // Other complex business logics
};
