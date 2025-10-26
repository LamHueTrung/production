"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
const logger_1 = __importDefault(require("./logger"));
class FileHelper {
    static getFullPath(fileName, folder, type = 'private') {
        const baseDir = type === 'public' ? path_1.default.resolve('public', folder) : path_1.default.resolve(env_1.StorageConfig.uploadPath, folder);
        return path_1.default.join(baseDir, fileName);
    }
    static async exists(fullPath) {
        try {
            await fs_1.default.promises.access(fullPath, fs_1.default.constants.F_OK);
            return true;
        }
        catch {
            return false;
        }
    }
    static async save(fileName, buffer, folder, type = 'private') {
        const fullPath = this.getFullPath(fileName, folder, type);
        await fs_1.default.promises.mkdir(path_1.default.dirname(fullPath), { recursive: true });
        await fs_1.default.promises.writeFile(fullPath, buffer);
        logger_1.default.info(`[FILE] Saved: ${fullPath}`);
        return fullPath;
    }
    static async delete(fullPath) {
        try {
            if (await this.exists(fullPath)) {
                await fs_1.default.promises.unlink(fullPath);
                logger_1.default.info(`[FILE] Deleted: ${fullPath}`);
                return true;
            }
            return false;
        }
        catch (err) {
            logger_1.default.error(`[FILE ERROR] Delete failed: ${fullPath} - ${err.message}`);
            return false;
        }
    }
    static async deleteMany(paths) {
        for (const p of paths)
            await this.delete(p);
    }
}
exports.FileHelper = FileHelper;
exports.default = FileHelper;
//# sourceMappingURL=file.js.map