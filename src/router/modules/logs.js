// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/logs",
    component: Layout,
    meta: {
      title: "日志管理",
      realPath: "/logs/operate",
    },
    children: [
      {
        path: "",
        redirect: "operate",
      },
      {
        path: "operate",
        component: () => import("../../views/logs/operate.vue"),
        meta: { title: "操作提示日志" },
      },
      {
        path: "route",
        component: () => import("../../views/logs/route.vue"),
        meta: { title: "接口路由日志" },
      },
      {
        path: "access",
        component: () => import("../../views/logs/access.vue"),
        meta: { title: "接口访问日志" },
      },
    ],
  },
];
