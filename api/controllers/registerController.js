const RegisterService = require("../services/registerService");
const logger = require("../../utils/logger");
const registerService = new RegisterService();

module.exports.register = async (req, res, next) => {
  try {
    const user = await registerService.register(req.body);
    logger.info(`User ${user._id} created`);
    res.status(201).json(user);
  } catch (error) {
    logger.error("Error creating user", { error: error.message });
    next(error);
  }
};
