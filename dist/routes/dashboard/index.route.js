"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const query_1 = require("../../controllers/dashboard/query");
const router = (0, express_1.Router)();
router.get('/', query_1.Home);
exports.default = router;
//# sourceMappingURL=index.route.js.map