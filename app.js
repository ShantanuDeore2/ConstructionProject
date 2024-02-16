const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { errors } = require("celebrate");
const permissionRoutes = require("./api/routes/permissionRoutes");
const errorHandler = require("./api/middlewares/errorHandler");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());

// Helmet helps secure Express apps by setting HTTP response headers
app.use(helmet());

// Enable CORS for all requests
app.use(cors());
// Setup morgan to use winston for logging
app.use(
  morgan("tiny", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use("/api/permissions", permissionRoutes);
app.use(errors());
app.use(errorHandler);

module.exports = app;
