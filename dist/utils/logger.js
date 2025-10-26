"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
const logDir = path_1.default.join(process.cwd(), 'logs');
const logFormat = winston_1.default.format.printf(({ timestamp, level, message, requestId, stack }) => {
    const idPart = requestId ? `[${requestId}]` : '';
    const stackPart = stack ? `\n${stack}` : '';
    return `${timestamp} ${level.toUpperCase()} ${idPart} : ${message}${stackPart}`;
});
const logger = winston_1.default.createLogger({
    level: env_1.Env.app.env === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({
            format: env_1.Env.app.env === 'development'
                ? winston_1.default.format.combine(winston_1.default.format.colorize(), logFormat)
                : winston_1.default.format.combine(winston_1.default.format.json()),
        }),
        new winston_1.default.transports.DailyRotateFile({
            dirname: logDir,
            filename: 'app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
            zippedArchive: true,
            level: 'info',
        }),
        new winston_1.default.transports.DailyRotateFile({
            dirname: logDir,
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxFiles: '30d',
            zippedArchive: true,
        }),
    ],
    exitOnError: false,
});
exports.log = {
    info: (message, requestId) => logger.info(message, { requestId }),
    warn: (message, requestId) => logger.warn(message, { requestId }),
    error: (message, requestId, stack) => logger.error(message, { requestId, stack }),
    debug: (message, requestId) => logger.debug(message, { requestId }),
};
exports.default = logger;
//# sourceMappingURL=logger.js.map