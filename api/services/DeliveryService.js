const { NotFoundError } = require("../middlewares/errorHandler");
/**
 * DeliveryService
 * @description :: Business logic and services for deliverys
 */
module.exports = class DeliveryService {
  constructor() {
    let Delivery;
    let DAO;

    if (process.env.DATABASE === "mongodb") {
      Delivery = require("../schemas/Delivery");
      DAO = require("../dao/MongoDAO");
    } else {
      Delivery = require("../schemas/Delivery");
      DAO = require("../dao/MongoDAO");
    }

    this.deliveryDao = new DAO(Delivery);
  }

  // Create a new product
  async create(deliveryData) {
    const delivery = await this.deliveryDao.create(deliveryData);
    return delivery;
  }

  // Get all deliverys
  async findAll() {
    const deliverys = await this.deliveryDao.findAll();
    return deliverys;
  }

  // Get a single product
  async findById(deliveryId) {
    const delivery = await this.deliveryDao.findById(deliveryId);
    if (!delivery) {
      throw new NotFoundError("Delivery not found");
    }
    return delivery;
  }

  // Update a single product
  async updateById(deliveryId, deliveryData) {
    const delivery = await this.deliveryDao.updateById(
      deliveryId,
      deliveryData
    );
    if (!delivery) {
      throw NotFoundError("Delivery not found");
    }
    return delivery;
  }

  // Delete a single product
  async deleteById(deliveryId) {
    await this.deliveryDao.deleteById(deliveryId);
  }

  // Other complex business logics
};
