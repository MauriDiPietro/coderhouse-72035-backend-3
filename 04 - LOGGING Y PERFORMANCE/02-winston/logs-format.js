import { createLogger, format, transports } from "winston";

const { combine, printf, timestamp, colorize } = format;

const logConfig = {
    format: combine(
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss",
        }),
        colorize(),
        printf((info) => `${[info.level]} | ${info.timestamp} | ${info.message}`),
    ),
    transports: [
        new transports.Console({ level: "silly" })
    ]
}

const logger = createLogger(logConfig);

logger.silly("silly message");
logger.debug("debug message");
logger.verbose("verbose message");
logger.info("info message");
logger.http("http message");
logger.warn("warn message");
logger.error("error message");