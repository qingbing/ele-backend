// 导入包
import store from "./../store/vuex";
// 默认页面标题
const pageTitle = "小Z后台管理系统";
// 导出计算页面标题
export default function getPageTitle(route) {
  if (store.getters.allowRoutes[route.path]) {
    return `${store.getters.allowRoutes[route.path]} - ${pageTitle}`;
  }
  if (route.meta.title) {
    return `${route.meta.title} - ${pageTitle}`;
  }
  return `${pageTitle}`;
}
