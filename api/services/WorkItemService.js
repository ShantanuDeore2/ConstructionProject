/**
 * WorkItemService
 * @description :: Business logic and services for WorkItem
 */
module.exports = class WorkItemService {
  constructor() {
    let WorkItem = require("../schemas/WorkItem");
    let MongoDao = require("../dao/MongoDAO");
    this.workItemDao = new MongoDao(WorkItem);
  }

  // Create a new workItem
  async create(workItemData) {
    const workItem = await this.workItemDao.create(workItemData);
    return workItem;
  }

  // Get all WorkItems
  async findAll() {
    const workItems = await this.workItemDao.findAll();
    return workItems;
  }

  // Get a single workItem
  async findById(workItemId) {
    const workItem = await this.workItemDao.findById(workItemId);
    return workItem;
  }

  // Update a single workItem
  async updateById(workItemId, workItemData) {
    const workItem = await this.workItemDao.updateById(
      workItemId,
      workItemData
    );
    return workItem;
  }

  // Delete a single workItem
  async deleteById(workItemId) {
    await this.workItemDao.deleteById(workItemId);
  }

  // Other complex business logics
};
