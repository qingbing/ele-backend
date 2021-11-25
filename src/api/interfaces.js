// 导入axios请求模块
import Axios from "./systems/portal";

/**
 * 导出
 */
export default {
  // 系统
  interfaceSystemList: (data) => Axios("/interface-system/list", data), // 查询系统列表
  interfaceSystemAdd: (data) => Axios("/interface-system/add", data), // 添加系统
  interfaceSystemEdit: (data) => Axios("/interface-system/edit", data), // 编辑系统
  interfaceSystemDel: (data) => Axios("/interface-system/del", data), // 删除系统
  interfaceSystemView: (data) => Axios("/interface-system/view", data), // 系统详情

  // 接口分类类型
  interfaceTypeList: (data) => Axios("/interface-type/list", data), // 查询接口分类列表
  interfaceTypeAdd: (data) => Axios("/interface-type/add", data), // 添加接口分类
  interfaceTypeEdit: (data) => Axios("/interface-type/edit", data), // 编辑接口分类
  interfaceTypeDel: (data) => Axios("/interface-type/del", data), // 删除接口分类
  interfaceTypeView: (data) => Axios("/interface-type/view", data), // 接口分类详情

  // 接口
  interfaceList: (data) => Axios("/interface/list", data), // 接口列表
  interfaceEdit: (data) => Axios("/interface/edit", data), // 编辑接口
  interfaceDel: (data) => Axios("/interface/del", data), // 删除接口
  interfaceView: (data) => Axios("/interface/view", data), // 接口详情
};
