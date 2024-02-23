const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * WorkDoneService
 * @description :: Business logic and services for workdones
 */
module.exports = class WorkDoneService {
  constructor() {
    let WorkDone;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      WorkDone = require("../schemas/WorkDone");
      DAO = require("../dao/MongoDAO");
    } else {
      WorkDone = require("../schemas/WorkDone");
      DAO = require("../dao/MongoDAO");
    }

    this.workdoneDao = new DAO(WorkDone);
  }

  // Create a new product
  async create(workdoneData) {
    const workdone = await this.workdoneDao.create(workdoneData);
    return workdone;
  }

  // Get all workdones
  async findAll() {
    const workdones = await this.workdoneDao.findAll();
    return workdones;
  }

  // Get a single product
  async findById(workdoneId) {
    const workdone = await this.workdoneDao.findById(workdoneId);
    if (!workdone) {
      throw new NotFoundError("WorkDone not found");
    }
    return workdone;
  }

  // Update a single product
  async updateById(workdoneId, workdoneData) {
    const workdone = await this.workdoneDao.updateById(
      workdoneId,
      workdoneData
    );
    if (!workdone) {
      throw NotFoundError("WorkDone not found");
    }
    return workdone;
  }

  // Delete a single product
  async deleteById(workdoneId) {
    await this.workdoneDao.deleteById(workdoneId);
  }

  // Other complex business logics
};
