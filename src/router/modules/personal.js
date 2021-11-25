// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/personal",
    component: Layout,
    meta: {
      title: "个人中心",
      realPath: "/personal/index",
    },
    children: [
      {
        path: "",
        redirect: "index",
      },
      {
        path: "index",
        component: () => import("../../views/personal/index.vue"),
        meta: { title: "个人信息" },
      },
      {
        path: "change-info",
        component: () => import("../../views/personal/change-info.vue"),
        meta: { title: "修改信息" },
      },
      {
        path: "reset-password",
        component: () => import("../../views/personal/reset-password.vue"),
        meta: { title: "重置密码" },
      },
    ],
  },
];
