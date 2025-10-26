"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashService = exports.HashService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashService {
    constructor(saltRounds = 12) {
        this.saltRounds = saltRounds;
    }
    async hash(plainText) {
        return bcryptjs_1.default.hash(plainText, this.saltRounds);
    }
    async compare(plainText, hashed) {
        return bcryptjs_1.default.compare(plainText, hashed);
    }
    hashSync(plainText) {
        return bcryptjs_1.default.hashSync(plainText, this.saltRounds);
    }
    compareSync(plainText, hashed) {
        return bcryptjs_1.default.compareSync(plainText, hashed);
    }
}
exports.HashService = HashService;
exports.hashService = new HashService();
//# sourceMappingURL=hash.js.map