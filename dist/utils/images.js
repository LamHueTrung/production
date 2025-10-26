"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageHelper = void 0;
const sharp_1 = __importDefault(require("sharp"));
const file_1 = __importDefault(require("./file"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
class ImageHelper {
    static async saveImage(fileName, buffer, folder, type = 'public', createThumb = true, thumbSize = { width: 150, height: 150 }) {
        const originalPath = await file_1.default.save(fileName, buffer, folder, type);
        const urls = {};
        urls['original'] = type === 'public' ? `${env_1.AppConfig.url}/${folder}/${fileName}` : originalPath;
        let thumbnail;
        if (createThumb) {
            const ext = path_1.default.extname(fileName);
            const base = path_1.default.basename(fileName, ext);
            const thumbName = `${base}_thumb${ext}`;
            const thumbFolder = path_1.default.join(folder, 'thumbnail');
            thumbnail = await file_1.default.save(thumbName, await (0, sharp_1.default)(buffer).resize(thumbSize.width, thumbSize.height).toBuffer(), thumbFolder, type);
            urls['thumbnail'] = type === 'public' ? `${env_1.AppConfig.url}/${thumbFolder}/${thumbName}` : thumbnail;
        }
        return { original: originalPath, thumbnail, urls };
    }
    static async deleteImageVariants(paths) {
        await file_1.default.deleteMany(paths);
    }
}
exports.ImageHelper = ImageHelper;
exports.default = ImageHelper;
//# sourceMappingURL=images.js.map