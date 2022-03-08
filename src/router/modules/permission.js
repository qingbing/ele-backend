// 导入
import Layout from "./../../views/layouts/index.vue";

// 导出个人模块路由
export default [
  {
    path: "/permission",
    component: Layout,
    meta: {
      title: "权限管理",
      realPath: "/permission/list",
    },
    children: [
      {
        path: "",
        redirect: "list",
      },
      {
        path: "interfaces",
        component: () => import("../../views/permission/interfaces.vue"),
        meta: { title: "接口管理" },
      },
      {
        path: "menu",
        component: () => import("../../views/permission/menu.vue"),
        meta: { title: "菜单管理" },
      },
      {
        path: "role",
        component: () => import("../../views/permission/role.vue"),
        meta: { title: "角色管理" },
      },
    ],
  },
];
