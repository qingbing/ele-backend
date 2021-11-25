// 引入包
import { isArray, isObject } from "@qingbing/helper";
/**
 * 需要格式化的数字, like
 *  1234567 => 1,234,567
 * @param {Integer} v 数字
 */
export function formatNumber(v) {
  return (+v || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * 获取 object 或 array 中对应索引的值
 * @param {string} key 索引
 * @param {object | array} vs 数据源
 * @param {mixed} defaultValue 默认值
 * @returns 索引值
 */
export function formatValue(key, vs, defaultValue) {
  if (isArray(vs)) {
    const fv = vs.filter((v, i) => {
      if (key == i) {
        return true;
      }
    });
    return fv.length > 0 ? fv[0] : defaultValue;
  } else if (isObject(vs)) {
    if (Object.hasOwnProperty.call(vs, key)) {
      return vs[key];
    }
    return defaultValue;
  }
  return defaultValue;
}
