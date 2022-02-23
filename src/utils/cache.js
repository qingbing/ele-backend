/**
 * 封装项目的本地(浏览器)缓存
 */
// 导入包和方法
import { local, cache } from "@qingbing/helper";
// 设置存储位置
cache.setStorage(local);
// 导出包
export default cache;
