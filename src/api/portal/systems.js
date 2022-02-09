// 导入axios请求模块
import Axios from "./_base";

/**
 * 导出
 */
export default {
  // 系统
  systemList: (data) => Axios("/system/list", data), // 查询系统列表
  systemAdd: (data) => Axios("/system/add", data), // 添加系统
  systemEdit: (data) => Axios("/system/edit", data), // 编辑系统
  systemDel: (data) => Axios("/system/del", data), // 删除系统
  systemView: (data) => Axios("/system/view", data), // 系统详情
};
