const UserService = require("../services/UserService");
const logger = require("../../utils/logger");
const userService = new UserService();

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const doc = await userService.create(req.body);
    logger.info(`User ${doc._id} created`);
    res.status(201).json(doc);
  } catch (error) {
    logger.error("Error creating user", { error: error.message });
    next(error);
  }
};

// Get a single user
exports.findUserById = async (req, res, next) => {
  try {
    const doc = await userService.findById(req.params.id);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error reading user", { error: error.message });
    next(error);
  }
};

// Get all users
exports.findAllUsers = async (req, res, next) => {
  try {
    const docs = await userService.findAll();
    res.status(200).json(docs);
  } catch (error) {
    logger.error("Error finding all users", { error: error.message });
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    const doc = await userService.updateById(req.params.id, req.body);
    if (!doc) {
      return next(error);
    }
    res.status(200).json(doc);
  } catch (error) {
    logger.error("Error updating user", { error: error.message });
    next(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteById(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting user", { error: error.message });
    next(error);
  }
};
