const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * WorkTypeService
 * @description :: Business logic and services for worktypes
 */
module.exports = class WorkTypeService {
  constructor() {
    let WorkType;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      WorkType = require("../schemas/WorkType");
      DAO = require("../dao/MongoDAO");
    } else {
      WorkType = require("../schemas/WorkType");
      DAO = require("../dao/MongoDAO");
    }

    this.worktypeDao = new DAO(WorkType);
  }

  // Create a new product
  async create(worktypeData) {
    const worktype = await this.worktypeDao.create(worktypeData);
    return worktype;
  }

  // Get all worktypes
  async findAll() {
    const worktypes = await this.worktypeDao.findAll();
    return worktypes;
  }

  // Get a single product
  async findById(worktypeId) {
    const worktype = await this.worktypeDao.findById(worktypeId);
    if (!worktype) {
      throw new NotFoundError("WorkType not found");
    }
    return worktype;
  }

  // Update a single product
  async updateById(worktypeId, worktypeData) {
    const worktype = await this.worktypeDao.updateById(
      worktypeId,
      worktypeData
    );
    if (!worktype) {
      throw NotFoundError("WorkType not found");
    }
    return worktype;
  }

  // Delete a single product
  async deleteById(worktypeId) {
    await this.worktypeDao.deleteById(worktypeId);
  }

  // Other complex business logics
};
