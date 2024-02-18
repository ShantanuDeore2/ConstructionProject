/**
 * WorkTypeService
 * @description :: Business logic and services for WorkType
 */
module.exports = class WorkTypeService {
  constructor() {
    let WorkType = require("../schemas/WorkType");
    let MongoDao = require("../dao/MongoDAO");
    this.workTypeDao = new MongoDao(WorkType);
  }

  // Create a new workType
  async create(workTypeData) {
    const workType = await this.workTypeDao.create(workTypeData);
    return workType;
  }

  // Get all WorkTypes
  async findAll() {
    const workTypes = await this.workTypeDao.findAll();
    return workTypes;
  }

  // Get a single workType
  async findById(workTypeId) {
    const workType = await this.workTypeDao.findById(workTypeId);
    return workType;
  }

  // Update a single workType
  async updateById(workTypeId, workTypeData) {
    const workType = await this.workTypeDao.updateById(
      workTypeId,
      workTypeData
    );
    return workType;
  }

  // Delete a single workType
  async deleteById(workTypeId) {
    await this.workTypeDao.deleteById(workTypeId);
  }

  // Other complex business logics
};
