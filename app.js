const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { errors } = require("celebrate");
const passport = require("./utils/passport-config");

const permissionRoutes = require("./api/routes/permissionRouter");
const departmentRoutes = require("./api/routes/departmentRouter");
const deliveryRoutes = require("./api/routes/deliveryRouter");
const userRoutes = require("./api/routes/userRouter");
const dimensionRoutes = require("./api/routes/dimensionRouter");
const projectRoutes = require("./api/routes/projectRouter");
const transactionRoutes = require("./api/routes/transactionRouter");
const workDoneRoutes = require("./api/routes/workDoneRouter");
const executionRoutes = require("./api/routes/executionRouter");
const inventoryRoutes = require("./api/routes/inventoryRouter");
const materialRoutes = require("./api/routes/materialRouter");
const materialDetailRoutes = require("./api/routes/materialDetailRouter");
const planRoutes = require("./api/routes/planRouter");
const purchaseOrderRoutes = require("./api/routes/purchaseOrderRouter");
const workItemRoutes = require("./api/routes/workItemRouter");
const workTypeRoutes = require("./api/routes/workTypeRouter");
const loginRoutes = require("./api/routes/loginRouter");
const registerRoutes = require("./api/routes/registerRouter");

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

app.use(passport.initialize());

app.use("/login", loginRoutes);
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
app.use(errors());
app.use(errorHandler);

module.exports = app;
