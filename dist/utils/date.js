"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAppTimezone = toAppTimezone;
exports.formatDate = formatDate;
exports.parseDate = parseDate;
exports.addTime = addTime;
exports.subTime = subTime;
exports.diffInSeconds = diffInSeconds;
exports.diffInMinutes = diffInMinutes;
exports.diffInHours = diffInHours;
exports.diffInDays = diffInDays;
exports.isBeforeDate = isBeforeDate;
exports.isAfterDate = isAfterDate;
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const env_1 = require("../config/env");
const TIMEZONE = env_1.Env.app.timezone || 'Asia/Ho_Chi_Minh';
function toAppTimezone(date) {
    const d = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    return (0, date_fns_tz_1.toZonedTime)(d, TIMEZONE);
}
function formatDate(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
    return (0, date_fns_1.format)(toAppTimezone(date), fmt);
}
function parseDate(dateStr) {
    return (0, date_fns_1.parseISO)(dateStr);
}
function addTime(date, duration) {
    return (0, date_fns_1.add)(toAppTimezone(date), {
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
    });
}
function subTime(date, duration) {
    return (0, date_fns_1.sub)(toAppTimezone(date), {
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
    });
}
function diffInSeconds(date1, date2) {
    return (0, date_fns_1.differenceInSeconds)(toAppTimezone(date1), toAppTimezone(date2));
}
function diffInMinutes(date1, date2) {
    return (0, date_fns_1.differenceInMinutes)(toAppTimezone(date1), toAppTimezone(date2));
}
function diffInHours(date1, date2) {
    return (0, date_fns_1.differenceInHours)(toAppTimezone(date1), toAppTimezone(date2));
}
function diffInDays(date1, date2) {
    return (0, date_fns_1.differenceInDays)(toAppTimezone(date1), toAppTimezone(date2));
}
function isBeforeDate(date1, date2) {
    return (0, date_fns_1.isBefore)(toAppTimezone(date1), toAppTimezone(date2));
}
function isAfterDate(date1, date2) {
    return (0, date_fns_1.isAfter)(toAppTimezone(date1), toAppTimezone(date2));
}
//# sourceMappingURL=date.js.map