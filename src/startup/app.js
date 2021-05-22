const express = require("express");
const app = express();
const cors = require("cors");
const { globalErrorHandler } = require("../middlewares/error");
const { loggerMiddleware } = require("../middlewares/logger");
const corsOptions = {
  origin: "*",
};

// route files
const account = require("../routes/account.route");
const transaction = require("../routes/transaction.route");

// middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static("public"));
app.use(loggerMiddleware);

// routes
app.use("/api/v1/account", account);
app.use("/api/v1/transaction", transaction);

app.use(globalErrorHandler);

// Default landing endpoint
app.use("/", (req, res, next) =>
  res.status(200).json({ message: "Welcome to Demo Accounting App." })
);
module.exports = app;
