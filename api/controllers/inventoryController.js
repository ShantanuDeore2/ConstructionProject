const InventoryService = require("../services/InventoryService");
const logger = require("../../utils/logger");
const inventoryService = new InventoryService();

// Create a new inventory
exports.createInventory = async (req, res, next) => {
  const doc = await inventoryService.create(req.body);
  logger.info(`Inventory ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single inventory
exports.findInventoryById = async (req, res, next) => {
  const doc = await inventoryService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all inventorys
exports.findAllInventorys = async (req, res, next) => {
  const docs = await inventoryService.findAll();
  res.status(200).json(docs);
};

// Update a inventory
exports.updateInventory = async (req, res, next) => {
  const doc = await inventoryService.updateById(req.params.id, req.body);
  logger.info(`Inventory ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a inventory
exports.deleteInventory = async (req, res, next) => {
  await inventoryService.deleteById(req.params.id);
  logger.info(`Inventory ${req.params.id} deleted`);
  res.status(204).send();
};
