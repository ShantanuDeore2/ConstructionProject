const MaterialService = require("../services/MaterialService");
const logger = require("../../utils/logger");
const materialService = new MaterialService();

// Create a new material
exports.createMaterial = async (req, res, next) => {
  console.log("inside createMaterial");
  try {
    const doc = await materialService.create(req.body);
    logger.info(`Material ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating material", { error: error.message });
    next(error);
  }
};

// Get a single material
exports.findMaterialById = async (req, res, next) => {
  try {
    const doc = await materialService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading material", { error: error.message });
    next(error);
  }
};

// Get all materials
exports.findAllMaterials = async (req, res, next) => {
  try {
    const docs = await materialService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all materials", { error: error.message });
    next(error);
  }
};

// Update a material
exports.updateMaterial = async (req, res, next) => {
  try {
    const doc = await materialService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating material", { error: error.message });
    next(error);
  }
};

// Delete a material
exports.deleteMaterial = async (req, res, next) => {
  try {
    await materialService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting material", { error: error.message });
    next(error);
  }
};
