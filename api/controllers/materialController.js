const MaterialService = require("../services/MaterialService");
const logger = require("../../utils/logger");
const materialService = new MaterialService();

// Create a new material
exports.createMaterial = async (req, res, next) => {
  const doc = await materialService.create(req.body);
  logger.info(`Material ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single material
exports.findMaterialById = async (req, res, next) => {
  const doc = await materialService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all materials
exports.findAllMaterials = async (req, res, next) => {
  const docs = await materialService.findAll();
  res.status(200).json(docs);
};

// Update a material
exports.updateMaterial = async (req, res, next) => {
  const doc = await materialService.updateById(req.params.id, req.body);
  logger.info(`Material ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a material
exports.deleteMaterial = async (req, res, next) => {
  await materialService.deleteById(req.params.id);
  logger.info(`Material ${req.params.id} deleted`);
  res.status(204).send();
};
