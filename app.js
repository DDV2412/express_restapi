// const apm = require("elastic-apm-node").start({
//   serviceName: "e_commerce",
//   serverUrl: "http://localhost:8200",
//   environment: process.env.NODE_ENV,
// });

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

/**
 * Import middleware
 */

const error = require("./middleware/error-middleware");

/**
 * Import logs
 */

const loggerWinston = require("./helpers/logs-winston");

/**
 * Swagger
 */
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/docs.json");

/**
 * Import router
 */

const router = require("./routes");

/**
 * Import DB Model
 */
const { sequelize } = require("./models");

const app = express();

/**
 * Import Use Case and Repository
 */

const productUseCase = require("./use_case/productUseCase");
const categoryUseCase = require("./use_case/categoryUseCase");
const subCategoryUseCase = require("./use_case/subCategoryUseCase");
const custumerUseCase = require("./use_case/customerUseCase");
const authUseCase = require("./use_case/authUseCase");
const custAddressUseCase = require("./use_case/custAddressUseCase");
const cartUseCase = require("./use_case/cartUseCase");

const productRepo = require("./repository/productRepo");
const categotyRepo = require("./repository/categotyRepo");
const subCategoryRepo = require("./repository/subCategoryRepo");
const custumerRepo = require("./repository/customerRepo");
const authRepo = require("./repository/authRepo");
const custAddresRepo = require("./repository/custAddressRepo");
const cartRepo = require("./repository/cartRepo");
/**
 * Init Use Case and Repository
 */

const productUC = new productUseCase(new productRepo());
const categoryUC = new categoryUseCase(new categotyRepo());
const subCategoryUC = new subCategoryUseCase(new subCategoryRepo());
const customerUC = new custumerUseCase(new custumerRepo());
const authUC = new authUseCase(new authRepo());
const custAddressUC = new custAddressUseCase(new custAddresRepo());
const cartUC = new cartUseCase(new cartRepo());
/**
 * Checking connection to database
 */

sequelize
  .authenticate()
  .then(() => {
    loggerWinston.info("Connection has been established successfully.");
  })
  .catch((err) => {
    loggerWinston.error("Unable to connect to the database:", err);
  });

/**
 * Middleware
 */
app.use(helmet());
app.use(morgan("combined", { stream: loggerWinston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Inject Use Case
 */

app.use((req, res, next) => {
  req.productUC = productUC;
  req.categoryUC = categoryUC;
  req.subCategoryUC = subCategoryUC;
  req.customerUC = customerUC;
  req.authUC = authUC;
  req.custAddressUC = custAddressUC;
  req.cartUC = cartUC;
  next();
});

/**
 * Init router
 */

app.use("/api", router);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  /**
   * #swagger.ignore = true
   */

  res.json({
    message: "Welcome to my API",
  });
});

app.use(express.static(path.join(__dirname + "/public/images")));
app.use(error);

module.exports = app;
