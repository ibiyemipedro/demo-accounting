const chalk = require("chalk");

exports.loggerMiddleware = (req, res, next) => {
  const currentDate = new Date();
  console.log(chalk.blue(`${req.method} ${req.path} - ${currentDate}`));
  next();
};
