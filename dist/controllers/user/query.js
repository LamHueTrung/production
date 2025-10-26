"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const getAllUsers = async (_req, res) => {
    try {
        return res.json({
            success: true,
            message: 'Fetched all users successfully',
            data: "hi",
        });
    }
    catch (error) {
        console.error('[getAllUsers Error]:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=query.js.map