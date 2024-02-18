/**
 * PurchaseOrderService
 * @description :: Business logic and services for PurchaseOrder
 */
module.exports = class PurchaseOrderService {
  constructor() {
    let PurchaseOrder = require("../schemas/PurchaseOrder");
    let MongoDao = require("../dao/MongoDAO");
    this.purchaseOrderDao = new MongoDao(PurchaseOrder);
  }

  // Create a new purchaseOrder
  async create(purchaseOrderData) {
    const purchaseOrder = await this.purchaseOrderDao.create(purchaseOrderData);
    return purchaseOrder;
  }

  // Get all PurchaseOrders
  async findAll() {
    const purchaseOrders = await this.purchaseOrderDao.findAll();
    return purchaseOrders;
  }

  // Get a single purchaseOrder
  async findById(purchaseOrderId) {
    const purchaseOrder = await this.purchaseOrderDao.findById(purchaseOrderId);
    return purchaseOrder;
  }

  // Update a single purchaseOrder
  async updateById(purchaseOrderId, purchaseOrderData) {
    const purchaseOrder = await this.purchaseOrderDao.updateById(
      purchaseOrderId,
      purchaseOrderData
    );
    return purchaseOrder;
  }

  // Delete a single purchaseOrder
  async deleteById(purchaseOrderId) {
    await this.purchaseOrderDao.deleteById(purchaseOrderId);
  }

  // Other complex business logics
};
