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
    buildWhere(conditions) {
        if (!conditions || Object.keys(conditions).length === 0)
            return { sql: '', params: [] };
        const keys = Object.keys(conditions);
        const sql = 'WHERE ' + keys.map(k => `\`${k}\` = ?`).join(' AND ');
        const params = keys.map(k => conditions[k]);
        return { sql, params };
    }
    buildPagination(pagination) {
        if (!pagination)
            return '';
        const limit = Math.min(pagination.limit || 10, 100);
        const offset = ((pagination.page || 1) - 1) * limit;
        const order = pagination.order === 'desc' ? 'DESC' : 'ASC';
        const sortBy = pagination.sortBy ? `\`${String(pagination.sortBy)}\`` : '`id`';
        return `ORDER BY ${sortBy} ${order} LIMIT ${limit} OFFSET ${offset}`;
    }
    async execute(query, params = []) {
        try {
            const start = Date.now();
            const [rows] = await this.pool.query(query, params);
            logger_1.default.info(`[DB] ${query} params=${JSON.stringify(params)} (${Date.now() - start}ms)`);
            return { success: true, data: rows };
        }
        catch (err) {
            logger_1.default.error(`[DB ERROR] ${query} params=${JSON.stringify(params)} error=${err.message}`);
            return { success: false, error: err.message };
        }
    }
    async find(conditions, pagination, joins) {
        const joinSql = joins?.map(j => `${j.type || 'INNER'} JOIN \`${j.table}\` ON ${j.on}`).join(' ') || '';
        const { sql: whereSql, params } = this.buildWhere(conditions);
        const paginationSql = this.buildPagination(pagination);
        const query = `SELECT * FROM \`${this.tableName}\` ${joinSql} ${whereSql} ${paginationSql}`;
        return this.execute(query, params);
    }
    async findOne(conditions, joins) {
        const res = await this.find(conditions, { page: 1, limit: 1 }, joins);
        if (!res.success)
            return { success: false, error: res.error };
        return { success: true, data: res.data?.[0] || null };
    }
    async insert(data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const query = `INSERT INTO \`${this.tableName}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
        return this.execute(query, values);
    }
    async upsert(data, conflictKeys) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const updateSql = keys
            .filter(k => !conflictKeys.includes(k))
            .map(k => `\`${k}\`=VALUES(\`${k}\`)`)
            .join(', ');
        const query = `INSERT INTO \`${this.tableName}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${keys.map(() => '?').join(', ')}) ON DUPLICATE KEY UPDATE ${updateSql}`;
        return this.execute(query, values);
    }
    async update(conditions, data) {
        const setKeys = Object.keys(data);
        const setValues = Object.values(data);
        const setSql = setKeys.map(k => `\`${k}\` = ?`).join(', ');
        const { sql: whereSql, params: whereParams } = this.buildWhere(conditions);
        const query = `UPDATE \`${this.tableName}\` SET ${setSql} ${whereSql}`;
        const params = [...setValues, ...whereParams];
        return this.execute(query, params);
    }
    async delete(conditions) {
        const { sql: whereSql, params } = this.buildWhere(conditions);
        const query = `DELETE FROM \`${this.tableName}\` ${whereSql}`;
        return this.execute(query, params);
    }
    async transaction(callback) {
        const conn = await this.pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await callback(conn);
            if (!result.success) {
                await conn.rollback();
                return result;
            }
            await conn.commit();
            return result;
        }
        catch (err) {
            await conn.rollback();
            logger_1.default.error(`[DB TRANSACTION ERROR] ${err.message}`);
            return { success: false, error: err.message };
        }
        finally {
            conn.release();
        }
    }
}
exports.DBHelper = DBHelper;
//# sourceMappingURL=dbHelper.js.map