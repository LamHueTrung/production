"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("./logger");
const errorHandler = (err, req, res, next) => {
    const requestId = req.headers['x-request-id'] || 'N/A';
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    logger_1.logger.error(`[${requestId}] ${req.method} ${req.originalUrl} - ${statusCode} - ${message}`);
    if (process.env.NODE_ENV !== 'production')
        console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        requestId,
        statusCode,
        error: message
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map