// 导入axios请求模块
import request from "@/utils/request";
import CONF from "@/conf/constant";
import { isUndefined } from "@qingbing/helper";

// 请求头 header
const headers = {
  [CONF.systemHeaderKey]: "configure-backend",
};

/**
 * axios 请求封装
 * @param {string} url 请求链接
 * @param {object} data 请求参数
 * @param {string} method 请求方法 get、post
 */
export default function axios(url, data, method) {
  if (isUndefined(method)) {
    method = "post";
  }
  return request({
    headers,
    url: url,
    method,
    data,
  });
}
