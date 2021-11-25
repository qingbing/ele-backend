// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  // 登录
  {
    path: "/login",
    component: () => import("./../../views/login/index.vue"),
    meta: { title: "登录" },
  },
  // 首页
  {
    path: "/",
    component: Layout,
    meta: {
      title: "控制面板",
      realPath: "/dashboard",
    },
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        component: () => import("./../../views/Home.vue"),
        meta: { title: "控制面板" },
      },
      // 错误页面
      {
        path: "/401",
        component: () => import("./../../views/error/401"),
        meta: { title: "Error401 ：无权访问网页" },
      },
      {
        path: "/404",
        component: () => import("./../../views/error/404"),
        meta: { title: "Error404 ：找不到网页" },
      },
    ],
  },
];
