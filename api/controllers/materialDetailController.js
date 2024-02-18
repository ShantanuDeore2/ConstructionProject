const MaterialDetailService = require("../services/MaterialDetailService");
const logger = require("../../utils/logger");
const materialDetailService = new MaterialDetailService();

// Create a new materialDetail
exports.createMaterialDetail = async (req, res, next) => {
  try {
    const doc = await materialDetailService.create(req.body);
    logger.info(`MaterialDetail ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating materialDetail", { error: error.message });
    next(error);
  }
};

// Get a single materialDetail
exports.findMaterialDetailById = async (req, res, next) => {
  try {
    const doc = await materialDetailService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading materialDetail", { error: error.message });
    next(error);
  }
};

// Get all materialDetails
exports.findAllMaterialDetails = async (req, res, next) => {
  try {
    const docs = await materialDetailService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all materialDetails", { error: error.message });
    next(error);
  }
};

// Update a materialDetail
exports.updateMaterialDetail = async (req, res, next) => {
  try {
    const doc = await materialDetailService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating materialDetail", { error: error.message });
    next(error);
  }
};

// Delete a materialDetail
exports.deleteMaterialDetail = async (req, res, next) => {
  try {
    await materialDetailService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting materialDetail", { error: error.message });
    next(error);
  }
};
