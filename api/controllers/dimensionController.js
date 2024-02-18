const DimensionService = require("../services/DimensionService");
const logger = require("../../utils/logger");
const dimensionService = new DimensionService();

// Create a new dimension
exports.createDimension = async (req, res, next) => {
  try {
    const doc = await dimensionService.create(req.body);
    logger.info(`Dimension ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating dimension", { error: error.message });
    next(error);
  }
};

// Get a single dimension
exports.findDimensionById = async (req, res, next) => {
  try {
    const doc = await dimensionService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading dimension", { error: error.message });
    next(error);
  }
};

// Get all dimensions
exports.findAllDimensions = async (req, res, next) => {
  try {
    const docs = await dimensionService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all dimensions", { error: error.message });
    next(error);
  }
};

// Update a dimension
exports.updateDimension = async (req, res, next) => {
  try {
    const doc = await dimensionService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating dimension", { error: error.message });
    next(error);
  }
};

// Delete a dimension
exports.deleteDimension = async (req, res, next) => {
  try {
    await dimensionService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting dimension", { error: error.message });
    next(error);
  }
};
