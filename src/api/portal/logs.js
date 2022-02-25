// 导入axios请求模块
import Axios from "./_base";

/**
 * 导出
 */
export default {
  // 操作日志
  operateLogList: (data) => Axios("/operate-log/list", data), // 操作日志列表
  operateLogView: (data) => Axios("/operate-log/view", data), // 操作日志详情
  // 接口路由日志
  routeList: (data) => Axios("/route-log/list", data), // 接口路由日志列表
  routeView: (data) => Axios("/route-log/view", data), // 接口路由日志详情
  // 接口日志
  accessList: (data) => Axios("/access-log/list", data), // 接口访问日志列表
  accessView: (data) => Axios("/access-log/view", data), // 接口访问日志详情
};
