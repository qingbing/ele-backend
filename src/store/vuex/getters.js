// 导出，简化常用的状态
export default {
  // 用户的左侧菜单是否折叠
  menuCollapse: (state) => state.app.menuCollapse,
  userInfo: (state) => state.user.info, // 登录用户信息
  menus: (state) => state.user.menus, // 登录用户可用菜单
  allowRoutes: (state) => state.user.allowRoutes, // 登录用户可用路由
};
