// 导入axios请求模块
import Axios from "./systems/portal";

/**
 * 导出
 */
export default {
  // 表单类型
  formList: (data) => Axios("/form-cate/list", data), // 查询表单列表
  formAdd: (data) => Axios("/form-cate/add", data), // 添加表单
  formEdit: (data) => Axios("/form-cate/edit", data), // 编辑表单
  formDel: (data) => Axios("/form-cate/del", data), // 删除表单
  formView: (data) => Axios("/form-cate/view", data), // 表单详情
  // 表单选项
  formOptionList: (data) => Axios("/form-option/list", data), // 表单选项列表
  formOptionAdd: (data) => Axios("/form-option/add", data), // 添加表单选项
  formOptionEdit: (data) => Axios("/form-option/edit", data), // 编辑表单选项
  formOptionDel: (data) => Axios("/form-option/del", data), // 删除表单选项
  formOptionUp: (data) => Axios("/form-option/order-up", data), // 顺序上移
  formOptionDown: (data) => Axios("/form-option/order-down", data), // 顺序下移
  formOptionRefresh: (data) => Axios("/form-option/refresh-order", data), // 刷新表单选项顺序
  // 配置表单
  formSettingGet: (data) => Axios("/form-setting/get", data), // 获取配置表单数据
  formSettingSave: (data) => Axios("/form-setting/save", data), // 保存配置表单数据
};
