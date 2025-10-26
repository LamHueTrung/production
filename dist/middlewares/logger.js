"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const logDir = path_1.default.join(process.cwd(), 'logs');
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`)),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: path_1.default.join(logDir, 'error.log'), level: 'error' }),
        new winston_1.transports.File({ filename: path_1.default.join(logDir, 'combined.log') })
    ],
    exceptionHandlers: [
        new winston_1.transports.File({ filename: path_1.default.join(logDir, 'exceptions.log') })
    ]
});
//# sourceMappingURL=logger.js.map