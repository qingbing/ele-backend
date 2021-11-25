// 导入
import { isEmpty } from "@qingbing/helper";
// 导出默认对象
export default {
  /**
   * 页面跳转
   */
  open($vm, url, isBlank) {
    const { href } = $vm.$router.resolve({
      path: url,
    });
    if (isBlank) {
      window.open(href, "_blank");
    } else {
      window.open(href);
    }
  },
  /**
   * 关闭窗口
   */
  closeWin() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      // close IE
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        window.opener = null;
        window.close();
      } else {
        window.open("", "_top");
        window.top.close();
      }
    } else {
      // close chrome;It is effective when it is only one.
      window.opener = null;
      window.open("", "_self");
      window.close();
    }
  },
  /**
   * 页面后台
   */
  back($vm, num) {
    if (isEmpty(num)) {
      num = -1;
    }
    $vm.$router.go(num);
  },
  /**
   * 路由跳转，参数示例，记录当前路由
   *    "/header"
   *    {path: "/header", query: {id: "5"}}
   *    {name: "header", params: {id: "5"}}
   */
  push($vm, path) {
    $vm.$router.push(path);
  },
  /**
   * 路由跳转，参数示例，不记录当前路由
   *    "/header"
   *    {path: "/header", query: {id: "5"}}
   *    {name: "header", params: {id: "5"}}
   */
  replace($vm, path) {
    $vm.$router.replace(path);
  },
  /**
   * 页面错误跳转
   */
  error404($vm) {
    $vm.$router.replace("/404");
  },
  /**
   * 权限错误跳转
   */
  error401($vm) {
    $vm.$router.replace("/401");
  },
};
