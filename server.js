require('dotenv').config();
const appRootPath = require("app-root-path");
const Express = require("express");
const app = Express();
const loggerWinston = require("./helper/logs-winston");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

PORT = 5000;
// app.set("host", process.env.PROXY || `http://127.0.0.1`);
// app.set("port", process.env.PORT || 8080);

// // app.listen(app.get("port"), () => {
// //   loggerWinston.info(
// //     `Server is running at ${app.get("host")}:${app.get("port")}`
// //   );
// });



app.use(Express.json());
app.use(Express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));

app.listen(PORT,() => {
  console.log('server running on PORT',PORT);
});
