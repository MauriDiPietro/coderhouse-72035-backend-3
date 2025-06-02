import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: {
      type: "file",
      filename: "./logs/example.log",
    },
    consoleAppender: {
        type: "console",
    }
  },
  categories: {
    default: {
      appenders: ["fileAppender", "consoleAppender"],
      level: "trace",
    },
    myLogger: {
        appenders: ["fileAppender"], level: "warn",
    }
  },
});

const logger = log4js.getLogger("myLogger");

logger.trace("fhgfdgdfg");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
