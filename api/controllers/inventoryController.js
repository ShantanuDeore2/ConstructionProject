const InventoryService = require("../services/InventoryService");
const logger = require("../../utils/logger");
const inventoryService = new InventoryService();

// Create a new inventory
exports.createInventory = async (req, res, next) => {
  try {
    const doc = await inventoryService.create(req.body);
    logger.info(`Inventory ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating inventory", { error: error.message });
    next(error);
  }
};

// Get a single inventory
exports.findInventoryById = async (req, res, next) => {
  try {
    const doc = await inventoryService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading inventory", { error: error.message });
    next(error);
  }
};

// Get all inventorys
exports.findAllInventorys = async (req, res, next) => {
  try {
    const docs = await inventoryService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all inventorys", { error: error.message });
    next(error);
  }
};

// Update a inventory
exports.updateInventory = async (req, res, next) => {
  try {
    const doc = await inventoryService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating inventory", { error: error.message });
    next(error);
  }
};

// Delete a inventory
exports.deleteInventory = async (req, res, next) => {
  try {
    await inventoryService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting inventory", { error: error.message });
    next(error);
  }
};
