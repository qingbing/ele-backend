// 导入axios请求模块
import Axios from "./_base";

/**
 * 系统清理缓存
 */
export function clearCache() {
  return Axios("/public/clear-cache");
}

/**
 * 获取系统用作选项
 */
export function getOptionForSystems() {
  return Axios("/public/option-systems");
}
