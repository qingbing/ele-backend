// 选项-权限管理(接口管理)
export default {
  searchFields: {
    id: "",
    code: "",
    name: "",
    is_enable: "",
  },
  searchItems: {
    id: {
      input_type: "input-text",
      label: "角色ID",
    },
    code: {
      input_type: "input-text",
      label: "角色标识",
    },
    name: {
      input_type: "input-text",
      label: "角色描述",
    },
    is_enable: {
      dataType: "enable",
      label: "启用状态",
    },
  },
};
