"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.connectDatabase = connectDatabase;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_1.Env.db.host,
    port: env_1.Env.db.port,
    username: env_1.Env.db.username,
    password: env_1.Env.db.password,
    database: env_1.Env.db.database,
    charset: env_1.Env.db.charset,
    timezone: env_1.Env.db.timezone,
    logging: env_1.Env.db.logging,
    synchronize: env_1.Env.app.env === 'development',
    entities: [
        env_1.Env.app.env === 'development'
            ? 'src/backend/models/**/*.ts'
            : 'dist/backend/models/**/*.js',
    ],
    extra: {
        connectionLimit: 50,
    },
});
async function connectDatabase(retryCount = 5, delayMs = 3000) {
    for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
            if (!exports.AppDataSource.isInitialized) {
                await exports.AppDataSource.initialize();
                console.log(`[DB] Connected to "${env_1.Env.db.database}" at ${env_1.Env.db.host}:${env_1.Env.db.port}`);
            }
            return;
        }
        catch (error) {
            console.error(`[DB] Connection failed (attempt ${attempt}/${retryCount}):`, error.message);
            if (attempt < retryCount) {
                console.log(`Retrying in ${delayMs / 1000}s...`);
                await new Promise(res => setTimeout(res, delayMs));
            }
            else {
                console.error('[DB] Could not connect after multiple attempts. Exiting...');
                process.exit(1);
            }
        }
    }
}
exports.AppDataSource.initialize()
    .then(() => {
    console.log('[DB] DataSource ready');
})
    .catch(() => {
});
//# sourceMappingURL=database.js.map