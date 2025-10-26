"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const Home = async (_req, res) => {
    return res.json({
        success: true,
        message: 'Fetched all users successfully',
        data: "hi",
    });
};
exports.Home = Home;
//# sourceMappingURL=query.js.map