const jwt = require("jsonwebtoken");
const passport = require("passport");

/**
 * Middleware to authenticate a user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @returns {void}
 */
exports.authenticate = passport.authenticate("jwt", { session: false });

/**
 * Middleware to authorize a user
 * @param {Array} roles - The roles to authorize
 * @returns {Function} - The middleware function
 */
exports.authorize = (roles) => (req, res, next) => {
  // Role-based access control logic
  next();
};
