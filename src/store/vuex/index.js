// 导入模块
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

// 使用组件
Vue.use(Vuex);

// 获取模块
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  getters,
  modules,
});
