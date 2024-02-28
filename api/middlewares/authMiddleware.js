const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("./errorHandler");

/**
 * Middleware to authenticate a user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @returns {void}
 */
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new AuthenticationError("Invalid token");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      throw new AuthenticationError("Invalid token");
    }
    console.log("inside authenticate", user);
    req.user = user;
    next();
  });
};

/**
 * Middleware to authorize a user
 * @param {Array} roles - The roles to authorize
 * @returns {Function} - The middleware function
 */
exports.authorize = (roles) => (req, res, next) => {
  // console.log("inside authorize");
  // console.log(req.user);
  // console.log(roles);
  // Role-based access control logic
  next();
};
