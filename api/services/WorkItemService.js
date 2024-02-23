const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * WorkItemService
 * @description :: Business logic and services for workitems
 */
module.exports = class WorkItemService {
  constructor() {
    let WorkItem;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      WorkItem = require("../schemas/WorkItem");
      DAO = require("../dao/MongoDAO");
    } else {
      WorkItem = require("../schemas/WorkItem");
      DAO = require("../dao/MongoDAO");
    }

    this.workitemDao = new DAO(WorkItem);
  }

  // Create a new product
  async create(workitemData) {
    const workitem = await this.workitemDao.create(workitemData);
    return workitem;
  }

  // Get all workitems
  async findAll() {
    const workitems = await this.workitemDao.findAll();
    return workitems;
  }

  // Get a single product
  async findById(workitemId) {
    const workitem = await this.workitemDao.findById(workitemId);
    if (!workitem) {
      throw new NotFoundError("WorkItem not found");
    }
    return workitem;
  }

  // Update a single product
  async updateById(workitemId, workitemData) {
    const workitem = await this.workitemDao.updateById(
      workitemId,
      workitemData
    );
    if (!workitem) {
      throw NotFoundError("WorkItem not found");
    }
    return workitem;
  }

  // Delete a single product
  async deleteById(workitemId) {
    await this.workitemDao.deleteById(workitemId);
  }

  // Other complex business logics
};
