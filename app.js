// const apm = require("elastic-apm-node").start({
//   serviceName: "e_commerce",
//   serverUrl: "http://localhost:8200",
//   environment: process.env.NODE_ENV,
// });

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

/**
 * Import middleware
 */

const error = require("./middleware/error-middleware");

/**
 * Import logs
 */

const loggerWinston = require("./helper/logs-winston");

/**
 * Import router
 */

const router = require("./routes");
const routerOrders = require("./routes/orderRoutes");
const chatRouter = require('./routes/chat');




/**
 * Import DB Model
 */
const { sequelize } = require("./models");

/**
 * Swagger
 */
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/api-docs.json");

const app = express();

/**
 * Import Use Case and Repository
 */
const ChatRepository = require('./repository/chat');

const ChatUseCase = require('./use_case/chat');

const productUseCase = require("./use_case/productUseCase");
const categoryUseCase = require("./use_case/categoryUseCase");
const subCategoryUseCase = require("./use_case/subCategoryUseCase");
const productRepo = require("./repository/productRepo");
const categotyRepo = require("./repository/categotyRepo");
const subCategoryRepo = require("./repository/subCategoryRepo");

const customerUseCase = require('./use_case/customerUseCase');
const customerRepository = require('./repository/customerRepo');

const custAddressUseCase = require('./use_case/custAddressUseCase');
const custAddressRepository = require('./repository/custAddressRepo');


/**
 * Init Use Case and Repository
 */

const productUC = new productUseCase(new productRepo());
const categoryUC = new categoryUseCase(new categotyRepo());
const subCategoryUC = new subCategoryUseCase(new subCategoryRepo());
const chatUC = new ChatUseCase( new ChatRepository());

const customerUC = new customerUseCase(new customerRepository());
const custAddressUC = new custAddressUseCase(new custAddressRepository());

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
  req.uC = [];

  req.uC.productUC = productUC;
  req.uC.categoryUC = categoryUC;
  req.uC.subCategoryUC = subCategoryUC;

  req.uC.customerUC = customerUC;
  req.uC.custAddressUC = custAddressUC;
  next();
});

/**
 * Init router
 */


app.use('/api/customer', customerRouter);
app.use('api/custAddress', custAddressRouter);
app.use("/api", router);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(error);


module.exports = app;
