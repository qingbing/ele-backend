// 导入axios请求模块
import Axios from "./_base";

/**
 * 导出
 */
export default {
  // 替换模版
  list: (data) => Axios("/backend/replace-setting/list", data), // 查询模版列表
  add: (data) => Axios("/backend/replace-setting/add", data), // 添加模版
  edit: (data) => Axios("/backend/replace-setting/edit", data), // 编辑模版
  del: (data) => Axios("/backend/replace-setting/del", data), // 删除模版
  view: (data) => Axios("/backend/replace-setting/view", data), // 模版详情
  setDefault: (data) => Axios("/backend/replace-setting/set-default", data), // 保存替换配置内容
  options: (data) => Axios("/backend/replace-setting/options", data), // 启用替换配置做成选项
  saveContent: (data) => Axios("/backend/replace-setting/save-content", data), // 保存替换配置内容
  detail: (data) => Axios("/backend/replace-setting/detail", data), // 替换配置详情
};
