// 导入axios请求模块
import Axios from "./systems/portal";

/**
 * todo
 * 获取系统用作选项
 */
export function getOptionInterfaceSystems() {
  return Axios("/public/option-interface-systems");
}

/**
 * todo
 * 获取系统用作选项
 */
export function getOptionInterfaceTypes(systemAlias) {
  return Axios("/public/option-interface-types", {
    system_alias: systemAlias,
  });
}

/**
 * todo
 * 系统清理缓存
 */
export function clearCache() {
  return Axios("/public/clear-cache");
}

/**
 * todo
 * 获取表头输入选项
 */
export function getHeaderOptions(headerKey) {
  return Axios("/public/header-options", {
    key: headerKey,
  });
}

/**
 * todo
 * 获取表单输入选项
 */
export function getFormOptions(key) {
  return Axios("/public/form-options", {
    key: key,
  });
}
