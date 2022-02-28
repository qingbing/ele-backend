// 导入axios请求模块
import Axios from "./_base";

/**
 * 获取表头输入选项
 */
export function getHeaderOptions(key) {
  return Axios("/backend/public/header-options", {
    key: key,
  });
}

/**
 * 获取表单输入选项
 */
export function getFormOptions(key) {
  return Axios("/backend/public/form-options", {
    key: key,
  });
}
