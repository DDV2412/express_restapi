const app = require("./app");
const loggerWinston = require("./helpers/logs-winston");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.set("host", process.env.PROXY || `http://0.0.0.0`);
app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  loggerWinston.info(
    `Server is running at ${app.get("host")}:${app.get("port")}`
  );
});
