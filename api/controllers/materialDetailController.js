const MaterialDetailService = require("../services/materialDetailService");
const logger = require("../../utils/logger");
const materialdetailService = new MaterialDetailService();

// Create a new materialdetail
exports.createMaterialDetail = async (req, res, next) => {
  const doc = await materialdetailService.create(req.body);
  logger.info(`MaterialDetail ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single materialdetail
exports.findMaterialDetailById = async (req, res, next) => {
  const doc = await materialdetailService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all materialdetails
exports.findAllMaterialDetails = async (req, res, next) => {
  const docs = await materialdetailService.findAll();
  res.status(200).json(docs);
};

// Update a materialdetail
exports.updateMaterialDetail = async (req, res, next) => {
  const doc = await materialdetailService.updateById(req.params.id, req.body);
  logger.info(`MaterialDetail ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a materialdetail
exports.deleteMaterialDetail = async (req, res, next) => {
  await materialdetailService.deleteById(req.params.id);
  logger.info(`MaterialDetail ${req.params.id} deleted`);
  res.status(204).send();
};
