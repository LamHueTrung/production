"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const query_1 = require("../controllers/user/query");
const router = (0, express_1.Router)();
router.get('/', query_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=user.route.js.map