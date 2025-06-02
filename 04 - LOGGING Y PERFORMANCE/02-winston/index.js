import winston, { transports } from "winston";
import 'winston-mongodb';

const logConfig = {
    transports: [ 
        new transports.Console({ level: 'info' }),
        new transports.File({ 
            filename: './logs/example.log', 
            level: 'warn' 
        }),
        winston.add(new transports.MongoDB({
            db: 'mongodb://127.0.0.1:27017/coderhouse',
            collection: 'logs',
            level: 'error',
            tryReconnect: true,
        }))
     ]
}

const logger = winston.createLogger(logConfig);

logger.level = "silly";

logger.silly("silly message");
logger.debug("debug message");
logger.verbose("verbose message");
logger.info("info message");
logger.http("http message");
logger.warn("warn message");
logger.error("error message");