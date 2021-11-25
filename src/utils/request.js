// 导入相应的函数和模块
import Axios from "axios";
import { Loading, Message } from "element-ui";
import { parseResult } from "./response";

// 定义加载提示
const loading = {
  instance: null,
  create() {
    if (null === this.instance) {
      // 创建实例，打开 loading 窗口
      this.instance = Loading.service({
        target: ".main",
        text: "努力加载中，请耐心等候",
        background: "rgba(0,0,0,0.5)",
      });
    }
  },
  close() {
    if (null !== this.instance) {
      // 销毁实例，并关闭 loading 窗口
      this.instance.close();
      this.instance = null;
    }
  },
};

// 创建请求
const request = Axios.create({
  // baseURL: '/', // 默认就是 "/",
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000, // 5000毫秒，5秒
});

// Axios 请求拦截
request.interceptors.request.use(
  (config) => {
    loading.create();
    return config;
  },
  (err) => {
    loading.close();
    Message({ message: "请求失败", type: "error" });
    return Promise.reject(err);
  }
);
// Axios 响应拦截
request.interceptors.response.use(
  (response) => {
    loading.close();
    if (response.request.responseType === "blob") {
      return response;
    }
    return parseResult(response.data);
  },
  (err) => {
    loading.close();
    Message({ message: `响应失败: ${err}`, type: "error" });
    return Promise.reject(err);
  }
);

// 导出默认对象
export default request;
