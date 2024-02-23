const UserService = require("../services/UserService");
const logger = require("../../utils/logger");
const userService = new UserService();

// Create a new user
exports.createUser = async (req, res, next) => {
  const doc = await userService.create(req.body);
  logger.info(`User ${doc._id} created`);
  res.status(201).json(doc);
};

// Get a single user
exports.findUserById = async (req, res, next) => {
  const doc = await userService.findById(req.params.id);
  res.status(200).json(doc);
};

// Get all users
exports.findAllUsers = async (req, res, next) => {
  const docs = await userService.findAll();
  res.status(200).json(docs);
};

// Update a user
exports.updateUser = async (req, res, next) => {
  const doc = await userService.updateById(req.params.id, req.body);
  logger.info(`User ${doc._id} updated`);
  res.status(200).json(doc);
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  await userService.deleteById(req.params.id);
  logger.info(`User ${req.params.id} deleted`);
  res.status(204).send();
};
