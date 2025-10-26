"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBHelper = void 0;
const logger_1 = __importDefault(require("./logger"));
class DBHelper {
    constructor(tableName, pool) {
        this.tableName = tableName;
        this.pool = pool;
    }
    async import(rows, batchSize = 200, conflictKeys = []) {
        const total = rows.length;
        let inserted = 0;
        const errors = [];
        for (let i = 0; i < total; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            if (!batch.length)
                continue;
            const keys = Object.keys(batch[0]);
            const placeholders = batch.map(() => `(${keys.map(() => '?').join(',')})`).join(',');
            const values = batch.flatMap(r => keys.map(k => r[k]));
            let updateSql = '';
            if (conflictKeys.length > 0) {
                updateSql = keys
                    .filter(k => !conflictKeys.includes(k))
                    .map(k => `\`${k}\`=VALUES(\`${k}\`)`)
                    .join(', ');
            }
            const query = conflictKeys.length > 0
                ? `INSERT INTO \`${this.tableName}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES ${placeholders} ON DUPLICATE KEY UPDATE ${updateSql}`
                : `INSERT INTO \`${this.tableName}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES ${placeholders}`;
            const conn = await this.pool.getConnection();
            try {
                await conn.beginTransaction();
                await conn.query(query, values);
                await conn.commit();
                inserted += batch.length;
                logger_1.default.info(`[DB IMPORT] Inserted batch ${i}–${i + batch.length} into ${this.tableName}`);
            }
            catch (err) {
                await conn.rollback();
                logger_1.default.error(`[DB IMPORT ERROR] Batch ${i}–${i + batch.length} error: ${err.message}`);
                errors.push(err.message);
            }
            finally {
                conn.release();
            }
        }
        return { success: errors.length === 0, inserted, errors };
    }
    async export(columns = [], batchSize = 500, conditions, callback) {
        const colSql = columns.length > 0
            ? columns.map(c => `\`${String(c)}\``).join(', ')
            : '/*';
        const errors = [];
        let totalRows = 0;
        const whereKeys = conditions ? Object.keys(conditions) : [];
        const whereSql = whereKeys.length
            ? 'WHERE ' + whereKeys.map(k => `\`${k}\` = ?`).join(' AND ')
            : '';
        const whereParams = whereKeys.length ? whereKeys.map(k => conditions[k]) : [];
        try {
            const [countRes] = await this.pool.query(`SELECT COUNT(*) as cnt FROM \`${this.tableName}\` ${whereSql}`, whereParams);
            totalRows = countRes[0]?.cnt || 0;
        }
        catch (err) {
            logger_1.default.error(`[DB EXPORT ERROR] Count rows failed: ${err.message}`);
            errors.push(err.message);
            return { success: false, totalRows, errors };
        }
        for (let offset = 0; offset < totalRows; offset += batchSize) {
            const query = `SELECT ${colSql} FROM \`${this.tableName}\` ${whereSql} LIMIT ? OFFSET ?`;
            try {
                const [rows] = await this.pool.query(query, [...whereParams, batchSize, offset]);
                if (callback)
                    await callback(rows);
            }
            catch (err) {
                logger_1.default.error(`[DB EXPORT ERROR] Batch ${offset}–${offset + batchSize} failed: ${err.message}`);
                errors.push(err.message);
            }
        }
        return { success: errors.length === 0, totalRows, errors };
    }
}
exports.DBHelper = DBHelper;
//# sourceMappingURL=dbHelperImportExport.js.map