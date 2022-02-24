/**
 * 管理所有状态数据的键名，比如：TOKEN、LANGUAGE等
 */
export default {
  systemHeaderKey: "x-system", // 后端系统的header头设置
  loginRoute: "/login", // 登录前端路由
  loginCheckTime: 120, // 登录检查频率
  loginCheckKey: "X-LOGIN-CHECK-TIME", // 登录cookie标记
  menuCollaspeKey: "MENU-COLLASPE", // 菜单
  cacheExpireKeyForPageStaticData: "XZ-", // 静态数据缓存key前缀
  // // 七牛云配置
  // qiniuUpload: "http://up-z1.qiniup.com/",
  // qiniuPrefix: "http://qiniu.phpcorner.net/"
};
