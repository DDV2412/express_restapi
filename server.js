const app = require("./app");
const loggerWinston = require("./helpers/logs-winston");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PROXY = process.env.PROXY || `0.0.0.0`;
const PORT = process.env.PORT || 8080;

app.listen(PORT, PROXY, () => {
  loggerWinston.info(`Server is running at ${PROXY}:${PORT}`);
});
