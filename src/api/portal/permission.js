// 导入axios请求模块
import Axios from "./_base";

/**
 * 导出
 */
export default {
  // API接口
  apiList: (data) => Axios("/api-path/list", data), // 查询API接口列表
  apiAdd: (data) => Axios("/api-path/add", data), // 添加API接口
  apiEdit: (data) => Axios("/api-path/edit", data), // 编辑API接口
  apiDel: (data) => Axios("/api-path/del", data), // 删除API接口
  apiView: (data) => Axios("/api-path/view", data), // API接口详情
  apiAllForTransfer: (data) => Axios("/api-path/all-for-transfer", data), // 所有API接口，为菜单分配api提供

  // 菜单路径
  menuTypeMap: (data) => Axios("/menu-path/type-map", data), // 菜单类型映射关系
  menuTreeMap: (data) => Axios("/menu-path/tree-map", data), // 菜单树映射关系
  menuTree: (data) => Axios("/menu-path/tree", data), // 树性结构
  menuAdd: (data) => Axios("/menu-path/add", data), // 添加菜单路径
  menuEdit: (data) => Axios("/menu-path/edit", data), // 编辑菜单路径
  menuDel: (data) => Axios("/menu-path/del", data), // 删除菜单路径
  menuView: (data) => Axios("/menu-path/view", data), // 菜单路径详情
  assignApiPath: (data) => Axios("/menu-path/assign-api-path", data), // 菜单分配接口
  getAssignedApiPath: (data) => Axios("/menu-path/get-assigned-api-path", data), // 获取菜单已分配的api-codes

  // 角色
  roleList: (data) => Axios("/role/list", data), // 查询角色列表
  roleAdd: (data) => Axios("/role/add", data), // 添加角色
  roleEdit: (data) => Axios("/role/edit", data), // 编辑角色
  roleDel: (data) => Axios("/role/del", data), // 删除角色
  roleView: (data) => Axios("/role/view", data), // 角色详情
  assignMenu: (data) => Axios("/role/assign-menu", data), // 菜单分配接口
};
