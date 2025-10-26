"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const index_route_1 = __importDefault(require("./dashboard/index.route"));
const router = (0, express_1.Router)();
router.use('/dashboard', index_route_1.default);
router.use('/users', user_route_1.default);
router.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'API route not found',
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map