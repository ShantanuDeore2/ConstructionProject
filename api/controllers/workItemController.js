const WorkItemService = require("../services/WorkItemService");
const logger = require("../../utils/logger");
const workItemService = new WorkItemService();

// Create a new workItem
exports.createWorkItem = async (req, res, next) => {
  try {
    const doc = await workItemService.create(req.body);
    logger.info(`WorkItem ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating workItem", { error: error.message });
    next(error);
  }
};

// Get a single workItem
exports.findWorkItemById = async (req, res, next) => {
  try {
    const doc = await workItemService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading workItem", { error: error.message });
    next(error);
  }
};

// Get all workItems
exports.findAllWorkItems = async (req, res, next) => {
  try {
    const docs = await workItemService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all workItems", { error: error.message });
    next(error);
  }
};

// Update a workItem
exports.updateWorkItem = async (req, res, next) => {
  try {
    const doc = await workItemService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating workItem", { error: error.message });
    next(error);
  }
};

// Delete a workItem
exports.deleteWorkItem = async (req, res, next) => {
  try {
    await workItemService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting workItem", { error: error.message });
    next(error);
  }
};
