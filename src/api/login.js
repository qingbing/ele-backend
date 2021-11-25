// 导入axios请求模块
import Axios from "./systems/portal";

/**
 * 确认当前客户端是否登录
 */
export function isLogin() {
  return Axios("/login/is-login");
}

/**
 * 确认当前客户端是否登录
 */
export function getSupportTypes() {
  return Axios("/login/get-support-types");
}

/**
 * 用户账户登录接口
 * @param {object} data 登录数据
 */
export function login(data) {
  return Axios("/login/sign-in", data);
}

/**
 * 账户退出登录
 */
export function logout() {
  return Axios("/login/sign-out");
}
