"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = exports.InternalError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.AuthError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message, errors) {
        super(message, 400, true);
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class AuthError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401, true);
    }
}
exports.AuthError = AuthError;
class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403, true);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404, true);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409, true);
    }
}
exports.ConflictError = ConflictError;
class InternalError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500, false);
    }
}
exports.InternalError = InternalError;
class DBError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "DBError";
        this.code = code;
    }
}
exports.DBError = DBError;
//# sourceMappingURL=errors.js.map