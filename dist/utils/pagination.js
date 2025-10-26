"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePagination = parsePagination;
exports.parseSort = parseSort;
exports.getPaginationAndSort = getPaginationAndSort;
function parsePagination(query, defaultLimit = 10, maxLimit = 100) {
    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || defaultLimit;
    if (page < 1)
        page = 1;
    if (limit < 1)
        limit = defaultLimit;
    if (limit > maxLimit)
        limit = maxLimit;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
}
function parseSort(query, allowedFields, defaultField) {
    const sortBy = allowedFields.includes(query.sortBy) ? query.sortBy : defaultField || allowedFields[0];
    const order = query.order === 'desc' ? 'desc' : 'asc';
    return { sortBy, order };
}
function getPaginationAndSort(query, allowedSortFields, defaultLimit = 10, maxLimit = 100, defaultSortField) {
    const pagination = parsePagination(query, defaultLimit, maxLimit);
    const sort = parseSort(query, allowedSortFields, defaultSortField);
    return { ...pagination, ...sort };
}
//# sourceMappingURL=pagination.js.map