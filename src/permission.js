// 引入模块
import "nprogress/nprogress.css";
import CONF from "./conf/constant";
import store from "./store/vuex/index";
import router from "./router";
import NProgress from "nprogress";
import getPageTitle from "./utils/get_page_title";
import { dump } from "@qingbing/helper";
import { Message } from "element-ui";
import { checkIsLogin, hasPermission } from "./auth";

// nprogress 配置
NProgress.configure({ showSpinner: false });

/**
 * to : 即将要进入的目标路由
 * from : 即将离开的路由对象
 * next : 一个方法，可以指定路由地址，进行路由跳转
 */
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 设置网页title
  document.title = getPageTitle(to);
  if (to.path == CONF.loginRoute) {
    next();
    // 结束进度条
    NProgress.done();
  } else if (!(await checkIsLogin())) {
    // 未登录
    next(`${CONF.loginRoute}?redirect=${to.path}`);
  } else {
    // 已经登录
    try {
      // 获取登录用户信息和菜单
      if (!store.getters.userInfo) {
        await store.dispatch("user/getInfo");
        await store.dispatch("user/getMenus");
      }
      if (hasPermission(to.path)) {
        // 拥有权限，直接跳转
        next();
      } else {
        // 没有权限，直接返回404
        next({ path: "/404", replace: true });
      }
    } catch (err) {
      dump.error(err);
      // 权限获取发生错误，重置token，并跳转登录页面
      await store.dispatch("user/resetToken");
      Message.error(err || "发生错误");
      next(`${CONF.loginRoute}?redirect=${to.path}`);
    }
  }
  // 结束进度条
  NProgress.done();
});

router.afterEach(() => {
  // 结束进度条
  NProgress.done();
});
