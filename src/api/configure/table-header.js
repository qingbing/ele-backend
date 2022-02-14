// 导入axios请求模块
import Axios from "./_base";

/**
 * 导出
 */
export default {
  // 表头类型
  headerList: (data) => Axios("/backend/header-category/list", data), // 查询表头列表
  headerAdd: (data) => Axios("/backend/header-category/add", data), // 添加表头
  headerEdit: (data) => Axios("/backend/header-category/edit", data), // 编辑表头
  headerDel: (data) => Axios("/backend/header-category/del", data), // 删除表头
  headerView: (data) => Axios("/backend/header-category/view", data), // 表头详情
  // 表头选项
  headerOptionList: (data) => Axios("/backend/header-option/list", data), // 表头选项列表
  headerOptionAdd: (data) => Axios("/backend/header-option/add", data), // 添加表头选项
  headerOptionEdit: (data) => Axios("/backend/header-option/edit", data), // 编辑表头选项
  headerOptionDel: (data) => Axios("/backend/header-option/del", data), // 删除表头选项
  headerOptionUp: (data) => Axios("/backend/header-option/order-up", data), // 顺序上移
  headerOptionDown: (data) => Axios("/backend/header-option/order-down", data), // 顺序下移
  headerOptionRefresh: (data) => Axios("/backend/header-option/refresh-order", data), // 刷新表头选项顺序
};
