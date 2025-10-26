"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
exports.validateParams = validateParams;
exports.isEmail = isEmail;
exports.isPhoneNumber = isPhoneNumber;
exports.isUUID = isUUID;
exports.isStrongPassword = isStrongPassword;
exports.isDateString = isDateString;
exports.isInteger = isInteger;
exports.isFloat = isFloat;
exports.isPositiveNumber = isPositiveNumber;
exports.isEnglishText = isEnglishText;
exports.sanitizeString = sanitizeString;
exports.validateEnum = validateEnum;
exports.validatePagination = validatePagination;
exports.validateSort = validateSort;
const zod_1 = require("zod");
class ValidationError extends Error {
    constructor(message, errors, statusCode = 400) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
function validateBody(schema, data) {
    try {
        return schema.parse(data);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            throw new ValidationError('Invalid request body', err.flatten().fieldErrors);
        }
        throw err;
    }
}
function validateQuery(schema, query) {
    try {
        return schema.parse(query);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            throw new ValidationError('Invalid query parameters', err.flatten().fieldErrors);
        }
        throw err;
    }
}
function validateParams(schema, params) {
    try {
        return schema.parse(params);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            throw new ValidationError('Invalid route parameters', err.flatten().fieldErrors);
        }
        throw err;
    }
}
function isEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
function isPhoneNumber(phone) {
    return /^\+?\d{7,15}$/.test(phone);
}
function isUUID(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function isStrongPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
function isDateString(value) {
    return !isNaN(Date.parse(value));
}
function isInteger(value) {
    return Number.isInteger(Number(value));
}
function isFloat(value) {
    return !isNaN(Number(value)) && !Number.isInteger(Number(value));
}
function isPositiveNumber(value) {
    return !isNaN(Number(value)) && Number(value) > 0;
}
function isEnglishText(value) {
    return /^[A-Za-z\s]+$/.test(value);
}
function sanitizeString(value) {
    return value.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function validateEnum(value, enumObject) {
    const enumValues = Object.values(enumObject);
    if (!enumValues.includes(value)) {
        throw new ValidationError(`Invalid value: ${value}. Allowed values: ${enumValues.join(', ')}`);
    }
    return value;
}
function validatePagination(query) {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(parseInt(query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    return { page, limit, offset };
}
function validateSort(query, allowedFields) {
    const sortBy = allowedFields.includes(query.sortBy) ? query.sortBy : allowedFields[0];
    const order = query.order === 'desc' ? 'desc' : 'asc';
    return { sortBy, order };
}
//# sourceMappingURL=validator.js.map