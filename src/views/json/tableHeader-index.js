// 选项-表头类型管理
export default {
  searchItems: {
    key: {
      input_type: "input-text",
      label: "表头标识",
    },
    name: {
      input_type: "input-text",
      label: "表头名称",
    },
    is_open: {
      dataType: "yesNo",
      label: "是否公开",
    },
  },
  tableHeaders: {
    _idx: {
      field: "_idx",
      label: "序号",
      default: "",
      width: "50",
      fixed: "left",
      is_resizable: true,
    },
    key: {
      field: "key",
      label: "表头标识",
      default: "",
      width: "240",
      fixed: "left",
      align: "left",
      is_resizable: true,
    },
    is_open: {
      field: "is_open",
      label: "是否公开",
      default: "",
      width: "80",
      options: ["否", "是"],
    },
    name: {
      field: "name",
      label: "表头名称",
      default: "",
      width: "300",
      align: "left",
      is_tooltip: true,
    },
    sort_order: {
      field: "sort_order",
      label: "排序",
      default: "",
      width: "60",
    },
    operate: {
      field: "operate",
      label: "操作",
      default: "",
      fixed: "right",
      align: "left",
      component: "operate",
    },
  },
  formOptions: {
    key: {
      input_type: "input-text",
      label: "表头标识",
      rules: [{ type: "required" }],
    },
    name: {
      input_type: "input-text",
      label: "表头名称",
      rules: [{ type: "required" }],
    },
    is_open: {
      input_type: "ele-switch",
      label: "是否公开",
    },
    sort_order: {
      input_type: "input-number",
      label: "排序",
      rules: [{ type: "required" }, { type: "number", min: 0, max: 127 }],
    },
    description: {
      input_type: "input-area",
      label: "描述",
      rules: [],
    },
  },
};
