import moment from "moment";
import { isUndefined } from "@qingbing/helper";
/**
 * 获取时间
 *
 * @param {string} type 类型，years,months,dates,weeks,weekdays,hours,minutes,seconds...
 * @param {string} format YYYY-MM-DD HH:mm:ss
 * @param {integer} num 相对数量
 * @param {mixed} relativeDate 相对时间
 * @returns string
 */
export function getTime(type, format, num, relativeDate) {
  let m = isUndefined(relativeDate) ? moment(relativeDate) : moment();
  type = type ?? "days";
  format = format ?? "YYYY-MM-DD HH:mm:ss";
  num = num ?? 0;
  if (0 == num) {
    return m.format(format);
  }
  return m.add(num, type).format(format);
}

/**
 * 获取时间范围
 *
 * @param {integer} num 相对数量
 * @param {string} type 类型，years,months,dates,weeks,weekdays,hours,minutes,seconds...
 * @param {string} format YYYY-MM-DD HH:mm:ss
 * @param {mixed} relativeDate 相对时间
 * @returns string
 */
export function getRangeTime(num, type, format, relativeDate) {
  let m = isUndefined(relativeDate) ? moment(relativeDate) : moment();
  type = type ?? "days";
  format = format ?? "YYYY-MM-DD HH:mm:ss";
  const end = m.format(format);
  const start = m.add(num, type).format(format);
  return [start, end];
}
