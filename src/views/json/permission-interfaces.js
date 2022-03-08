// 选项-权限管理(接口管理)
export default {
  searchItems: {
    path: {
      input_type: "input-text",
      label: "API路径",
    },
    name: {
      input_type: "input-text",
      label: "接口名",
    },
    is_public: {
      dataType: "yesNo",
      label: "是否开放",
    },
    is_enable: {
      dataType: "enable",
      label: "启用状态",
    },
  },
};
