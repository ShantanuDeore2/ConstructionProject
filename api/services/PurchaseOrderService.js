const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * PurchaseOrderService
 * @description :: Business logic and services for purchaseorders
 */
module.exports = class PurchaseOrderService {
  constructor() {
    let PurchaseOrder;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      PurchaseOrder = require("../schemas/PurchaseOrder");
      DAO = require("../dao/MongoDAO");
    } else {
      PurchaseOrder = require("../schemas/PurchaseOrder");
      DAO = require("../dao/MongoDAO");
    }

    this.purchaseorderDao = new DAO(PurchaseOrder);
  }

  // Create a new product
  async create(purchaseorderData) {
    const purchaseorder = await this.purchaseorderDao.create(purchaseorderData);
    return purchaseorder;
  }

  // Get all purchaseorders
  async findAll() {
    const purchaseorders = await this.purchaseorderDao.findAll();
    return purchaseorders;
  }

  // Get a single product
  async findById(purchaseorderId) {
    const purchaseorder = await this.purchaseorderDao.findById(purchaseorderId);
    if (!purchaseorder) {
      throw new NotFoundError("PurchaseOrder not found");
    }
    return purchaseorder;
  }

  // Update a single product
  async updateById(purchaseorderId, purchaseorderData) {
    const purchaseorder = await this.purchaseorderDao.updateById(
      purchaseorderId,
      purchaseorderData
    );
    if (!purchaseorder) {
      throw NotFoundError("PurchaseOrder not found");
    }
    return purchaseorder;
  }

  // Delete a single product
  async deleteById(purchaseorderId) {
    await this.purchaseorderDao.deleteById(purchaseorderId);
  }

  // Other complex business logics
};
