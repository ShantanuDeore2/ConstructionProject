const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * InventoryService
 * @description :: Business logic and services for inventorys
 */
module.exports = class InventoryService {
  constructor() {
    let Inventory;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Inventory = require("../schemas/Inventory");
      DAO = require("../dao/MongoDAO");
    } else {
      Inventory = require("../schemas/Inventory");
      DAO = require("../dao/MongoDAO");
    }

    this.inventoryDao = new DAO(Inventory);
  }

  // Create a new product
  async create(inventoryData) {
    const inventory = await this.inventoryDao.create(inventoryData);
    return inventory;
  }

  // Get all inventorys
  async findAll() {
    const inventorys = await this.inventoryDao.findAll();
    return inventorys;
  }

  // Get a single product
  async findById(inventoryId) {
    const inventory = await this.inventoryDao.findById(inventoryId);
    if (!inventory) {
      throw new NotFoundError("Inventory not found");
    }
    return inventory;
  }

  // Update a single product
  async updateById(inventoryId, inventoryData) {
    const inventory = await this.inventoryDao.updateById(
      inventoryId,
      inventoryData
    );
    if (!inventory) {
      throw NotFoundError("Inventory not found");
    }
    return inventory;
  }

  // Delete a single product
  async deleteById(inventoryId) {
    await this.inventoryDao.deleteById(inventoryId);
  }

  // Other complex business logics
};
