// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "replace",
        component: () => import("../../views/replace/index.vue"),
        meta: { title: "替换模版" },
      },
    ],
  },
];
