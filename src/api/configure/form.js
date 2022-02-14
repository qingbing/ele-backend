// 导入axios请求模块
import Axios from "./_base";

/**
 * 导出
 */
export default {
  // 表单类型
  formList: (data) => Axios("/backend/form-category/list", data), // 查询表单列表
  formAdd: (data) => Axios("/backend/form-category/add", data), // 添加表单
  formEdit: (data) => Axios("/backend/form-category/edit", data), // 编辑表单
  formDel: (data) => Axios("/backend/form-category/del", data), // 删除表单
  formView: (data) => Axios("/backend/form-category/view", data), // 表单详情
  // 表单选项
  formOptionList: (data) => Axios("/backend/form-option/list", data), // 表单选项列表
  formOptionAdd: (data) => Axios("/backend/form-option/add", data), // 添加表单选项
  formOptionEdit: (data) => Axios("/backend/form-option/edit", data), // 编辑表单选项
  formOptionDel: (data) => Axios("/backend/form-option/del", data), // 删除表单选项
  formOptionUp: (data) => Axios("/backend/form-option/order-up", data), // 顺序上移
  formOptionDown: (data) => Axios("/backend/form-option/order-down", data), // 顺序下移
  formOptionRefresh: (data) => Axios("/backend/form-option/refresh-order", data), // 刷新表单选项顺序
  // 配置表单
  formSettingGet: (data) => Axios("/backend/form-setting/get", data), // 获取配置表单数据
  formSettingSave: (data) => Axios("/backend/form-setting/save", data), // 保存配置表单数据
};
