// 导入axios请求模块
import Axios from "./systems/portal";

/**
 * 获取前端用户拥有权限的菜单
 */
export function getInfo() {
  return Axios("/personal/info");
}

/**
 * 获取登录用户信息
 */
export function getMenus() {
  return Axios("/personal/menu");
}

/**
 * 修改个人信息
 */
export function changeInfo(data) {
  return Axios("/personal/change-info", data);
}

/**
 * 重置密码
 */
export function resetPassword(data) {
  return Axios("/personal/reset-password", data);
}
