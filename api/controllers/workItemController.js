const WorkItemService = require("../services/workItemService");
const logger = require("../../utils/logger");
const workitemService = new WorkItemService();

// Create a new workitem
exports.createWorkItem = async (req, res, next) => {
  const doc = await workitemService.create(req.body);
  logger.info(`WorkItem ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single workitem
exports.findWorkItemById = async (req, res, next) => {
  const doc = await workitemService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all workitems
exports.findAllWorkItems = async (req, res, next) => {
  const docs = await workitemService.findAll();
  res.status(200).json(docs);
};

// Update a workitem
exports.updateWorkItem = async (req, res, next) => {
  const doc = await workitemService.updateById(req.params.id, req.body);
  logger.info(`WorkItem ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a workitem
exports.deleteWorkItem = async (req, res, next) => {
  await workitemService.deleteById(req.params.id);
  logger.info(`WorkItem ${req.params.id} deleted`);
  res.status(204).send();
};
