"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ms_1 = __importDefault(require("ms"));
const env_1 = require("../config/env");
const validator_1 = require("./validator");
class JWTService {
    constructor() {
        this.secret = env_1.Env.security.jwtSecret;
        this.expiresIn = env_1.Env.security.jwtExpire || '1h';
    }
    sign(payload, options) {
        const expiresInSec = (0, ms_1.default)(this.expiresIn) / 1000;
        const signOptions = {
            algorithm: 'HS256',
            expiresIn: expiresInSec,
            ...options,
        };
        return jsonwebtoken_1.default.sign(payload, this.secret, signOptions);
    }
    verify(token) {
        try {
            const raw = token.replace(/^Bearer\s+/i, '').trim();
            return jsonwebtoken_1.default.verify(raw, this.secret);
        }
        catch (err) {
            throw new validator_1.ValidationError('Invalid or expired token', err.message, 401);
        }
    }
    decode(token) {
        try {
            const raw = token.replace(/^Bearer\s+/i, '').trim();
            return jsonwebtoken_1.default.decode(raw);
        }
        catch {
            return null;
        }
    }
}
exports.JWTService = JWTService;
exports.jwtService = new JWTService();
//# sourceMappingURL=jwt.js.map