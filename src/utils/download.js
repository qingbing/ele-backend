// 导入
import request from "./request";
import { isObject, isUndefined } from "@qingbing/helper";

/**
 * 下载文件函数
 *
 * @param {string} url 导出path
 * @param {object} data 查询参数
 * @param {string} method 请求类型
 * @param {object} headers 请求头
 */
export default function (url, data, filename, options) {
  // 从 options 中提取参数
  isUndefined(options) && (options = {});
  const headers =
    isUndefined(options.headers) || !isObject(options.headers)
      ? {}
      : options.headers;
  const method = isUndefined(options.method) ? "post" : options.method;
  headers["Content-Type"] = "application/json;charset=UTF-8";
  const queryData = {
    headers,
    url: url,
    method: method,
    responseType: "blob", // 指定服务器返回的数据类型
  };
  if ("get" !== method) {
    queryData.method = "post";
    queryData.data = data;
  } else {
    queryData.method = "get";
    queryData.params = data;
  }
  // 查询
  request(queryData)
    .then((res) => {
      // 响应落文件
      const blob = new Blob([res.data]);
      if (isUndefined(filename)) {
        const reg = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        const ms = reg.exec(res.headers["content-disposition"]);
        if (ms) {
          filename = ms[1];
        } else {
          filename = Date.parse(new Date()) + ".xlsx";
        }
      }
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = decodeURIComponent(filename);
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
    .catch((err) => err);
}
