// 导入包
import CONF from "./conf/constant";
import store from "./store/vuex/index";
import { asyncRequest } from "./utils/response";
import { cookie } from "@qingbing/helper";
import { isLogin } from "./api/portal/login";

// 变量声明
const checkKey = CONF.loginCheckKey;
const checkTime = CONF.loginCheckTime;

/**
 * 设置登录标记
 */
export function setLoginFlag() {
  cookie.set(checkKey, true, checkTime);
}

/**
 * 清除登录标记
 */
export function removeLoginFlag() {
  cookie.remove(checkKey);
}

/**
 * 检查是否登录
 * @returns {boolean}
 */
export async function checkIsLogin() {
  const loginFlag = cookie.get(checkKey);
  if (loginFlag) {
    return true;
  }
  const hasLogin = (await asyncRequest(isLogin)).data;
  if (hasLogin) {
    // 设置登录标记
    setLoginFlag();
  }
  return hasLogin;
}

/**
 * 判断用户是否拥有访问路由的权限
 * @param {string} route
 */
export function hasPermission(route) {
  return true;
  // if (inArray(route, routes.authRoutes)) {
  //   return true;
  // }
  if (store.getters.allowRoutes[route]) {
    return true;
  }
  return false;
}
