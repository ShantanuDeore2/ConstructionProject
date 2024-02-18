/**
 * WorkDoneService
 * @description :: Business logic and services for WorkDone
 */
module.exports = class WorkDoneService {
  constructor() {
    let WorkDone = require("../schemas/WorkDone");
    let MongoDao = require("../dao/MongoDAO");
    this.workDoneDao = new MongoDao(WorkDone);
  }

  // Create a new workDone
  async create(workDoneData) {
    const workDone = await this.workDoneDao.create(workDoneData);
    return workDone;
  }

  // Get all WorkDones
  async findAll() {
    const workDones = await this.workDoneDao.findAll();
    return workDones;
  }

  // Get a single workDone
  async findById(workDoneId) {
    const workDone = await this.workDoneDao.findById(workDoneId);
    return workDone;
  }

  // Update a single workDone
  async updateById(workDoneId, workDoneData) {
    const workDone = await this.workDoneDao.updateById(
      workDoneId,
      workDoneData
    );
    return workDone;
  }

  // Delete a single workDone
  async deleteById(workDoneId) {
    await this.workDoneDao.deleteById(workDoneId);
  }

  // Other complex business logics
};
