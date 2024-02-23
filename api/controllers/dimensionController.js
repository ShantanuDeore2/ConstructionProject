const DimensionService = require("../services/DimensionService");
const logger = require("../../utils/logger");
const dimensionService = new DimensionService();

// Create a new dimension
exports.createDimension = async (req, res, next) => {
  const doc = await dimensionService.create(req.body);
  logger.info(`Dimension ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single dimension
exports.findDimensionById = async (req, res, next) => {
  const doc = await dimensionService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all dimensions
exports.findAllDimensions = async (req, res, next) => {
  const docs = await dimensionService.findAll();
  res.status(200).json(docs);
};

// Update a dimension
exports.updateDimension = async (req, res, next) => {
  const doc = await dimensionService.updateById(req.params.id, req.body);
  logger.info(`Dimension ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a dimension
exports.deleteDimension = async (req, res, next) => {
  await dimensionService.deleteById(req.params.id);
  logger.info(`Dimension ${req.params.id} deleted`);
  res.status(204).send();
};
