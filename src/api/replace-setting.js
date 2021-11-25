// 导入axios请求模块
import Axios from "./systems/portal";

/**
 * 导出
 */
export default {
  // 替换模版
  replaceSettingList: (data) => Axios("/replace-setting/list", data), // 查询模版列表
  replaceSettingEdit: (data) => Axios("/replace-setting/edit", data), // 编辑模版
  replaceSettingView: (data) => Axios("/replace-setting/view", data), // 模版详情
};
