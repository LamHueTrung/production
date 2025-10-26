"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const constants_1 = require("./utils/constants");
const routes_1 = __importDefault(require("./routes"));
const ssr_1 = require("./server/ssr");
const app = (0, express_1.default)();
if (env_1.Env.app.env === 'development') {
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
}
else {
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                connectSrc: ["'self'"],
                imgSrc: ["'self'", 'data:'],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
}
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
if (env_1.Env.app.env === 'development')
    app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: env_1.Env.system.corsOrigin,
    credentials: true,
}));
app.use('/api', routes_1.default);
app.use((err, _req, res, _next) => {
    console.error('[Error Handler]:', err);
    res.status(500).json({
        success: false,
        error: constants_1.Messages.SERVER_ERROR,
        message: err.message,
    });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        const isProd = env_1.Env.app.env !== 'development';
        await (0, ssr_1.setupSSR)(app, isProd);
        app.listen(env_1.Env.app.port, () => {
            console.log(`✅ Server started on ${env_1.Env.app.url}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await database_1.AppDataSource.destroy();
    process.exit(0);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
startServer();
//# sourceMappingURL=main.js.map