"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotFound = exports.sendUnauthorized = exports.sendBadRequest = exports.sendPaginated = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message = 'Request successful', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message = 'Internal Server Error', statusCode = 500, errors) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
exports.sendError = sendError;
const sendPaginated = (res, data, total, page, limit, message = 'Request successful', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    });
};
exports.sendPaginated = sendPaginated;
const sendBadRequest = (res, message = 'Bad request', errors) => (0, exports.sendError)(res, message, 400, errors);
exports.sendBadRequest = sendBadRequest;
const sendUnauthorized = (res, message = 'Unauthorized') => (0, exports.sendError)(res, message, 401);
exports.sendUnauthorized = sendUnauthorized;
const sendNotFound = (res, message = 'Resource not found') => (0, exports.sendError)(res, message, 404);
exports.sendNotFound = sendNotFound;
//# sourceMappingURL=response.js.map