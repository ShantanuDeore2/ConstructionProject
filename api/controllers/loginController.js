const LoginService = require("../services/LoginService");
const logger = require("../../utils/logger");
const { AuthenticationError } = require("../middlewares/errorHandler");
const loginService = new LoginService();

// Create a new inventory
exports.login = async (req, res, next) => {
  const { accessToken, refreshToken } = await loginService.tryLogin(req);
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // cross-site cookies
    maxAge: 7 * 60 * 60 * 24 * 1000, // 7 days
  });
  res.status(200).json({ accessToken });
};

exports.refresh = async (req, res, next) => {
  const accessToken = await loginService.tryRefresh(req);
  res.status(200).json({ accessToken });
};

exports.logout = async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie.jwt) {
    throw new AuthenticationError("Invalid refresh token");
  }
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.status(200).json({ message: "Logged out" });
};
