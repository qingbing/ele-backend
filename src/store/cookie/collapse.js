/**
 * 菜单扩展、隐藏的 cookie 管理
 */
// 导入包
import { cookie } from "@qingbing/helper";
import CONF from "./../../conf/constant";

// 定义保存变量
const menuCollapseKey = CONF.menuCollaspeKey ?? "MENU-COOLAPSE";

/**
 * 获取菜单伸缩的状态
 */
export function getMenuCollapse() {
  return cookie.get(menuCollapseKey);
}

/**
 * 设置菜单伸缩的状态
 * @param {Boolean} collapse
 */
export function setMenuCollapse(collapse) {
  return cookie.set(menuCollapseKey, collapse);
}

/**
 * 删除菜单伸缩的状态
 */
export function removeMenuCollapse() {
  return cookie.remove(menuCollapseKey);
}
