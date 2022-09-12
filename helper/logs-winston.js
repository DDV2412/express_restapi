const winston = require("winston");
const appRoot = require("app-root-path");
const { formatISO } = require("date-fns");

const appendIsoDate = () => {
  const isoFormat = formatISO(new Date(), {
    format: "extended",
    representation: "complete",
  });

  return isoFormat.toString();
};

const options = {
  alllog: {
    filename: `${appRoot}/logs/applog.log`,
    level: "debug",
    format: winston.format.combine(
      winston.format.timestamp({ format: appendIsoDate }),
      winston.format.colorize(),
      winston.format.json()
    ),
  },
  errorlog: {
    filename: `${appRoot}/logs/app-error.log`,
    level: "error",
    format: winston.format.combine(
      winston.format.timestamp({ format: appendIsoDate }),
      winston.format.colorize(),
      winston.format.json()
    ),
  },
  warnlog: {
    filename: `${appRoot}/logs/app-warn.log`,
    level: "warn",
    format: winston.format.combine(
      winston.format.timestamp({ format: appendIsoDate }),
      winston.format.colorize(),
      winston.format.json()
    ),
  },
  httplog: {
    level: "verbose",
    format: winston.format.combine(
      winston.format.timestamp({ format: appendIsoDate }),
      winston.format.colorize(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    format: winston.format.combine(
      winston.format.timestamp({ format: appendIsoDate }),
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
  rejection: {
    filename: `${appRoot}/logs/app-rejection.log`,
  },
};

const loggerWinston = winston.createLogger({
  transports: [
    new winston.transports.File(options.alllog),
    new winston.transports.File(options.errorlog),
    new winston.transports.File(options.warnlog),
    new winston.transports.Http(options.httplog),
    new winston.transports.Console(options.console),
  ],
  rejectionHandlers: [new winston.transports.File(options.rejection)],
  exitOnError: false,
});

loggerWinston.stream = {
  write(message) {
    loggerWinston.info(message);
  },
};

module.exports = loggerWinston;
