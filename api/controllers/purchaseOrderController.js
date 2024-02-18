const PurchaseOrderService = require("../services/PurchaseOrderService");
const logger = require("../../utils/logger");
const purchaseOrderService = new PurchaseOrderService();

// Create a new purchaseOrder
exports.createPurchaseOrder = async (req, res, next) => {
  try {
    const doc = await purchaseOrderService.create(req.body);
    logger.info(`PurchaseOrder ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating purchaseOrder", { error: error.message });
    next(error);
  }
};

// Get a single purchaseOrder
exports.findPurchaseOrderById = async (req, res, next) => {
  try {
    const doc = await purchaseOrderService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading purchaseOrder", { error: error.message });
    next(error);
  }
};

// Get all purchaseOrders
exports.findAllPurchaseOrders = async (req, res, next) => {
  try {
    const docs = await purchaseOrderService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all purchaseOrders", { error: error.message });
    next(error);
  }
};

// Update a purchaseOrder
exports.updatePurchaseOrder = async (req, res, next) => {
  try {
    const doc = await purchaseOrderService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating purchaseOrder", { error: error.message });
    next(error);
  }
};

// Delete a purchaseOrder
exports.deletePurchaseOrder = async (req, res, next) => {
  try {
    await purchaseOrderService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting purchaseOrder", { error: error.message });
    next(error);
  }
};
