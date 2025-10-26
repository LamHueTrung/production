"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestId = exports.requestIdMiddleware = void 0;
const uuid_1 = require("uuid");
const requestIdMiddleware = (req, res, next) => {
    const id = (0, uuid_1.v4)();
    req.requestId = id;
    res.setHeader('X-Request-Id', id);
    next();
};
exports.requestIdMiddleware = requestIdMiddleware;
const getRequestId = (req) => {
    return req.requestId || '';
};
exports.getRequestId = getRequestId;
//# sourceMappingURL=requestId.js.map