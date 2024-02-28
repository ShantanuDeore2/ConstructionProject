const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");

const {
  permissionRoutes,
  departmentRoutes,
  deliveryRoutes,
  userRoutes,
  dimensionRoutes,
  projectRoutes,
  transactionRoutes,
  workDoneRoutes,
  executionRoutes,
  inventoryRoutes,
  materialRoutes,
  materialDetailRoutes,
  planRoutes,
  purchaseOrderRoutes,
  workItemRoutes,
  workTypeRoutes,
  loginRoutes,
  registerRoutes,
} = require("./api/routes");

const { errorHandlerMiddleware } = require("./api/middlewares/errorHandler");
const logger = require("./utils/logger");

const app = express();
app.use(express.json());
app.use(cookieParser());

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

app.use("/auth", loginRoutes);
app.use("/register", registerRoutes);
app.use("/permissions", permissionRoutes);
app.use("/departments", departmentRoutes);
app.use("/deliveries", deliveryRoutes);
app.use("/users", userRoutes);
app.use("/dimensions", dimensionRoutes);
app.use("/projects", projectRoutes);
app.use("/transactions", transactionRoutes);
app.use("/workdones", workDoneRoutes);
app.use("/executions", executionRoutes);
app.use("/inventories", inventoryRoutes);
app.use("/materials", materialRoutes);
app.use("/materialdetails", materialDetailRoutes);
app.use("/plans", planRoutes);
app.use("/purchaseorders", purchaseOrderRoutes);
app.use("/workitems", workItemRoutes);
app.use("/worktypes", workTypeRoutes);
// app.use(errors());
app.use(errorHandlerMiddleware);

module.exports = app;
