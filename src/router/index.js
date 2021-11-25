// 导入
import Vue from "vue";
import VueRouter from "vue-router";
import { merge } from "@qingbing/helper";

// 使用 router
Vue.use(VueRouter);

// 获取模块
let routes = [];
const files = require.context("./modules", true, /\.js$/);
files.keys().reduce((modules, modulePath) => {
  const value = files(modulePath);
  routes = merge(routes, value.default);
}, {});

// 导出
export default new VueRouter({
  routes,
});
