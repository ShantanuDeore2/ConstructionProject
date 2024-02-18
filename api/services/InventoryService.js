/**
 * InventoryService
 * @description :: Business logic and services for Inventory
 */
module.exports = class InventoryService {
  constructor() {
    let Inventory = require("../schemas/Inventory");
    let MongoDao = require("../dao/MongoDAO");
    this.inventoryDao = new MongoDao(Inventory);
  }

  // Create a new inventory
  async create(inventoryData) {
    const inventory = await this.inventoryDao.create(inventoryData);
    return inventory;
  }

  // Get all Inventorys
  async findAll() {
    const inventorys = await this.inventoryDao.findAll();
    return inventorys;
  }

  // Get a single inventory
  async findById(inventoryId) {
    const inventory = await this.inventoryDao.findById(inventoryId);
    return inventory;
  }

  // Update a single inventory
  async updateById(inventoryId, inventoryData) {
    const inventory = await this.inventoryDao.updateById(
      inventoryId,
      inventoryData
    );
    return inventory;
  }

  // Delete a single inventory
  async deleteById(inventoryId) {
    await this.inventoryDao.deleteById(inventoryId);
  }

  // Other complex business logics
};
