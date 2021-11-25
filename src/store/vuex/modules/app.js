// 引入
import { getMenuCollapse, setMenuCollapse } from "./../../cookie/collapse";

const state = {
  menuCollapse: "true" === getMenuCollapse(),
};

const mutations = {
  SET_MENU_COLLAPSE: (state, menuCollapse) => {
    state.menuCollapse = menuCollapse;
    setMenuCollapse(menuCollapse);
  },
};

const actions = {
  setMenuCollapse: ({ commit }, menuCollapse) => {
    commit("SET_MENU_COLLAPSE", menuCollapse);
  },
};
// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
