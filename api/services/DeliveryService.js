/**
 * DeliveryService
 * @description :: Business logic and services for Delivery
 */
module.exports = class DeliveryService {
  constructor() {
    let Delivery = require("../schemas/Delivery");
    let MongoDao = require("../dao/MongoDAO");
    this.deliveryDao = new MongoDao(Delivery);
  }

  // Create a new delivery
  async create(deliveryData) {
    const delivery = await this.deliveryDao.create(deliveryData);
    return delivery;
  }

  // Get all Deliverys
  async findAll() {
    const deliverys = await this.deliveryDao.findAll();
    return deliverys;
  }

  // Get a single delivery
  async findById(deliveryId) {
    const delivery = await this.deliveryDao.findById(deliveryId);
    return delivery;
  }

  // Update a single delivery
  async updateById(deliveryId, deliveryData) {
    const delivery = await this.deliveryDao.updateById(
      deliveryId,
      deliveryData
    );
    return delivery;
  }

  // Delete a single delivery
  async deleteById(deliveryId) {
    await this.deliveryDao.deleteById(deliveryId);
  }

  // Other complex business logics
};
