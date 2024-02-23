const PurchaseOrderService = require("../services/PurchaseOrderService");
const logger = require("../../utils/logger");
const purchaseorderService = new PurchaseOrderService();

// Create a new purchaseorder
exports.createPurchaseOrder = async (req, res, next) => {
  const doc = await purchaseorderService.create(req.body);
  logger.info(`PurchaseOrder ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single purchaseorder
exports.findPurchaseOrderById = async (req, res, next) => {
  const doc = await purchaseorderService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all purchaseorders
exports.findAllPurchaseOrders = async (req, res, next) => {
  const docs = await purchaseorderService.findAll();
  res.status(200).json(docs);
};

// Update a purchaseorder
exports.updatePurchaseOrder = async (req, res, next) => {
  const doc = await purchaseorderService.updateById(req.params.id, req.body);
  logger.info(`PurchaseOrder ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a purchaseorder
exports.deletePurchaseOrder = async (req, res, next) => {
  await purchaseorderService.deleteById(req.params.id);
  logger.info(`PurchaseOrder ${req.params.id} deleted`);
  res.status(204).send();
};
