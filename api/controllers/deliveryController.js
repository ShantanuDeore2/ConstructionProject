const DeliveryService = require("../services/DeliveryService");
const logger = require("../../utils/logger");
const deliveryService = new DeliveryService();

// Create a new delivery
exports.createDelivery = async (req, res, next) => {
  const doc = await deliveryService.create(req.body);
  logger.info(`Delivery ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single delivery
exports.findDeliveryById = async (req, res, next) => {
  const doc = await deliveryService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all deliverys
exports.findAllDeliverys = async (req, res, next) => {
  const docs = await deliveryService.findAll();
  res.status(200).json(docs);
};

// Update a delivery
exports.updateDelivery = async (req, res, next) => {
  const doc = await deliveryService.updateById(req.params.id, req.body);
  logger.info(`Delivery ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a delivery
exports.deleteDelivery = async (req, res, next) => {
  await deliveryService.deleteById(req.params.id);
  logger.info(`Delivery ${req.params.id} deleted`);
  res.status(204).send();
};
