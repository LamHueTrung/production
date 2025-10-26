"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = exports.UserRole = exports.SortOrder = exports.EnvFlags = exports.FeatureFlags = exports.Regex = exports.CacheDefaults = exports.PaginationDefaults = exports.ApiPrefix = exports.Messages = void 0;
exports.Messages = {
    SUCCESS: 'Operation completed successfully.',
    CREATED: 'Resource created successfully.',
    UPDATED: 'Resource updated successfully.',
    DELETED: 'Resource deleted successfully.',
    NOT_FOUND: 'Resource not found.',
    INVALID_REQUEST: 'Invalid request data.',
    UNAUTHORIZED: 'Unauthorized access.',
    FORBIDDEN: 'Forbidden access.',
    SERVER_ERROR: 'Internal server error.',
};
exports.ApiPrefix = {
    V1: '/api/v1',
};
exports.PaginationDefaults = {
    PAGE: 1,
    LIMIT: 10,
    MAX_LIMIT: 100,
    SORT_ORDER: 'asc',
};
exports.CacheDefaults = {
    TTL_SHORT: 60,
    TTL_MEDIUM: 300,
    TTL_LONG: 3600,
};
exports.Regex = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PHONE: /^\+?\d{7,15}$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    ENGLISH_TEXT: /^[A-Za-z\s]+$/,
    STRONG_PASSWORD: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
exports.FeatureFlags = {
    ENABLE_SIGNUP: true,
    ENABLE_EMAIL_VERIFICATION: false,
    ENABLE_TWO_FACTOR_AUTH: false,
};
exports.EnvFlags = {
    IS_PROD: process.env.NODE_ENV === 'production',
    IS_DEV: process.env.NODE_ENV === 'development',
    IS_TEST: process.env.NODE_ENV === 'test',
};
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["GUEST"] = "guest";
})(UserRole || (exports.UserRole = UserRole = {}));
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
//# sourceMappingURL=constants.js.map