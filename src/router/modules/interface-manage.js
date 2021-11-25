// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/interface-manage",
    component: Layout,
    meta: {
      title: "接口管理",
      realPath: "/interface-manage/list",
    },
    children: [
      {
        path: "",
        redirect: "list",
      },
      {
        path: "system",
        component: () => import("../../views/interface-manage/system.vue"),
        meta: { title: "接口系统" },
      },
      {
        path: "type",
        component: () => import("../../views/interface-manage/type.vue"),
        meta: { title: "接口分类" },
      },
      {
        path: "list",
        component: () => import("../../views/interface-manage/list.vue"),
        meta: { title: "接口管理" },
      },
    ],
  },
];
