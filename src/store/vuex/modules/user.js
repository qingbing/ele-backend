// 引入包
import { setLoginFlag, removeLoginFlag } from "./../../../auth";
import { login, logout } from "./../../../api/login";
import { getInfo, getMenus } from "./../../../api/personal";
import { isArray, merge } from "@qingbing/helper";

/**
 * 权限菜单处理
 * @param {Object} menus
 */
const dealMenu = (menus) => {
  let allowRoutes = {};
  menus.forEach((item) => {
    // 将 route 加入允许路由中
    let subAllowRoutes = {
      [item.route]: item.label,
    };
    // 将 linkRoutes 路由加入允许路由中
    if (isArray(item.linkRoutes)) {
      subAllowRoutes = merge(subAllowRoutes, item.linkRoutes);
    }
    // 将 subItems 中的所有路由加入允许路由中
    if (isArray(item.subItems) && item.subItems.length > 0) {
      subAllowRoutes = merge(
        subAllowRoutes,
        dealMenu(item.subItems).allowRoutes
      );
    }
    item.allowRoutes = subAllowRoutes;
    allowRoutes = merge(allowRoutes, subAllowRoutes);
  });
  return { menus, allowRoutes };
};

// 定义状态数据
const state = {
  info: null,
  menus: [],
  allowRoutes: {},
};

const mutations = {
  SET_INFO: (state, info) => {
    state.info = info;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_ALLOW_ROUTES: (state, allowRoutes) => {
    state.allowRoutes = allowRoutes;
  },
};

const actions = {
  login(state, formData) {
    const { type, account, password } = formData;
    return new Promise((resolve, reject) => {
      login({
        type,
        account: account.trim(),
        password: password.trim(),
      })
        .then(() => {
          // 设置登录检查标记
          setLoginFlag();
          resolve();
        })
        .catch((err) => reject(err));
    });
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // 获取个人信息
      getInfo()
        .then((res) => {
          // 设置 store 信息
          commit("SET_INFO", res.data);
          // 返回用户信息
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
  getMenus({ commit }) {
    return new Promise((resolve, reject) => {
      // 获取个人信息
      getMenus()
        .then((res) => {
          // 递归处理菜单路由
          const { menus, allowRoutes } = dealMenu(res.data);
          // 设置 store 信息
          commit("SET_MENUS", menus);
          commit("SET_ALLOW_ROUTES", allowRoutes);
          // 返回信息
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then((res) => {
          // 清除登录标记
          removeLoginFlag();
          // 重置其它用户消息
          commit("SET_INFO", null);
          commit("SET_MENUS", []);
          commit("SET_ALLOW_ROUTES", []);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

export default {
  namespaced: true, // 使用模块命名空间，在使用时也加上命令空间即可
  state,
  mutations,
  actions,
};
