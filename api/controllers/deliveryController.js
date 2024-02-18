const DeliveryService = require("../services/DeliveryService");
const logger = require("../../utils/logger");
const deliveryService = new DeliveryService();

// Create a new delivery
exports.createDelivery = async (req, res, next) => {
  try {
    const doc = await deliveryService.create(req.body);
    logger.info(`Delivery ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating delivery", { error: error.message });
    next(error);
  }
};

// Get a single delivery
exports.findDeliveryById = async (req, res, next) => {
  try {
    const doc = await deliveryService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading delivery", { error: error.message });
    next(error);
  }
};

// Get all deliverys
exports.findAllDeliverys = async (req, res, next) => {
  try {
    const docs = await deliveryService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all deliverys", { error: error.message });
    next(error);
  }
};

// Update a delivery
exports.updateDelivery = async (req, res, next) => {
  try {
    const doc = await deliveryService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating delivery", { error: error.message });
    next(error);
  }
};

// Delete a delivery
exports.deleteDelivery = async (req, res, next) => {
  try {
    await deliveryService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting delivery", { error: error.message });
    next(error);
  }
};
