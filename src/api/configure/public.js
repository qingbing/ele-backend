// 导入axios请求模块
import Axios from "./_base";

/**
 * todo
 * 获取表头输入选项
 */
export function getHeaderOptions(headerKey) {
  return Axios("/backend/public/header-options", {
    key: headerKey,
  });
}

/**
 * todo
 * 获取表单输入选项
 */
export function getFormOptions(key) {
  return Axios("/backend/public/form-options", {
    key: key,
  });
}
