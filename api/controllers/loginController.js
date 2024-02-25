const LoginService = require("../services/LoginService");
const logger = require("../../utils/logger");
const loginService = new LoginService();

// Create a new inventory
exports.login = async (req, res, next) => {
  const token = await loginService.tryLogin(req);
  res.status(200).json({ token });
};
