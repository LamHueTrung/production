"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = exports.SystemConfig = exports.StorageConfig = exports.SecurityConfig = exports.DatabaseConfig = exports.AppConfig = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const getEnv = (key, fallback) => {
    const value = process.env[key];
    if (value === undefined || value === '') {
        if (fallback !== undefined)
            return fallback;
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
const parseBool = (val, fallback = false) => val ? ['true', '1', 'yes'].includes(val.toLowerCase()) : fallback;
const parseNumber = (val, fallback) => val && !isNaN(Number(val)) ? Number(val) : fallback;
const ENV = getEnv('APP_ENV', 'development');
const IS_DEV = ENV === 'development';
exports.AppConfig = {
    name: getEnv('APP_NAME', 'MyApp'),
    env: ENV,
    port: parseNumber(process.env.APP_PORT, 5000),
    debug: parseBool(process.env.APP_DEBUG, true),
    url: IS_DEV ? getEnv('APP_URL_LOCAL') : getEnv('APP_URL'),
    frontendUrl: IS_DEV ? getEnv('FRONTEND_URL_LOCAL') : getEnv('FRONTEND_URL'),
    timezone: getEnv('APP_TIMEZONE', 'Asia/Ho_Chi_Minh'),
};
exports.DatabaseConfig = {
    connection: getEnv('DB_CONNECTION', 'mysql'),
    host: getEnv('DB_HOST', 'localhost'),
    port: parseNumber(process.env.DB_PORT, 3306),
    database: getEnv('DB_DATABASE', 'mydb'),
    username: getEnv('DB_USERNAME', 'root'),
    password: getEnv('DB_PASSWORD', ''),
    charset: getEnv('DB_CHARSET', 'utf8mb4'),
    timezone: getEnv('DB_TIMEZONE', 'Z'),
    logging: parseBool(process.env.DB_LOGGING, false),
};
exports.SecurityConfig = {
    jwtSecret: getEnv('JWT_SECRET', 'super_secret'),
    jwtExpire: getEnv('JWT_EXPIRE', '1h'),
    refreshTokenExpire: getEnv('REFRESH_TOKEN_EXPIRE', '7d'),
};
exports.StorageConfig = {
    uploadPath: getEnv('UPLOAD_PATH', 'uploads'),
    logPath: getEnv('LOG_PATH', 'logs'),
};
exports.SystemConfig = {
    corsOrigin: exports.AppConfig.frontendUrl,
    rateLimitWindow: getEnv('RATE_LIMIT_WINDOW', '15m'),
    rateLimitMax: parseNumber(process.env.RATE_LIMIT_MAX, 100),
};
exports.Env = {
    app: exports.AppConfig,
    db: exports.DatabaseConfig,
    security: exports.SecurityConfig,
    storage: exports.StorageConfig,
    system: exports.SystemConfig,
};
console.log(`[ENV] Loaded configuration for ${exports.AppConfig.env} on port ${exports.AppConfig.port}`);
console.log(`[ENV] Backend URL: ${exports.AppConfig.url}, Frontend URL: ${exports.AppConfig.frontendUrl}`);
//# sourceMappingURL=env.js.map