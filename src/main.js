import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/vuex/index";

Vue.config.productionTip = false;

// 注意引入element-ui在Vue下，因为可能会被其他组件使用到
import Element from "element-ui";
import "./styles/element-variables.scss";
// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import enLang from "element-ui/lib/locale/lang/en"; // ui的多语言，默认中文
import "./styles/index.scss"; // 全局样式
Vue.use(Element, {
  size: "medium", // 设置element-ui的默认大小
  // locale: enLang // 如果使用中文，无需设置，请删除
});

// 导入表单展示
import ElementForm from "@qingbing/element-form";
import ajaxMethod from "./utils/ajax_remote";
Vue.use(ElementForm, {
  ajaxMethod,
});
// 代码高亮
import Highlight from "@qingbing/vue-highlight";
Vue.use(Highlight);

// markdown 在线编辑器
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);

// 引入自定义全局过滤器
import * as filters from "./filters";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 引入权限管理
import "./permission";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
