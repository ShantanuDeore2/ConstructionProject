const logger = require("../../utils/logger");

module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(`Error Custom: ${err.message}`);
  res.status(status).json({ error: err.message });
};
