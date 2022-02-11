// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "system",
        component: () => import("../../views/systems/index.vue"),
        meta: { title: "系统管理" },
      },
    ],
  },
];
