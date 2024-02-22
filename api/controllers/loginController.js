const LoginService = require("../services/loginService");
const logger = require("../../utils/logger");
const loginService = new LoginService();

// Create a new inventory
exports.login = async (req, res, next) => {
  try {
    const token = await loginService.tryLogin(req);
    if (!token) {
      return res.status(401).send("Authentication failed");
    }
    res.status(200).json({ token });
  } catch (error) {
    logger.error("Error logging in", { error: error.message });
    next(error);
  }
};
