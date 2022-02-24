/**
 * 封装项目的本地(浏览器)缓存
 */
// 导入包和方法
import { local, cache } from "@qingbing/helper";
import Conf from "./../conf/constant";
// 设置存储位置
cache.setStorage(local);
/**
 * 生成页面静态数据缓存key
 *
 * @param {string} key 标志
 * @returns {string}
 */
cache.getPageStaticDataKey = function (key) {
  return `${Conf.cacheExpireKeyForPageStaticData}${key}`;
};
// 导出包
export default cache;
