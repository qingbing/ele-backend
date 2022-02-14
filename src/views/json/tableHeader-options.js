const fixedOptions = {
  left: "靠左",
  right: "靠右",
};

const alignOptions = {
  left: "左对齐",
  center: "居中对齐",
  right: "右对齐",
};
// 选项-表头选项管理
export default {
  tableHeaders: {
    _idx: {
      field: "_idx",
      label: "序号",
      default: "",
      width: "50",
      fixed: "left",
    },
    field: {
      field: "field",
      label: "选项字段",
      default: "",
      width: "100",
      fixed: "left",
      align: "left",
    },
    label: {
      field: "label",
      label: "选项名称",
      default: "",
      width: "150",
      align: "left",
      params: {
        type: "text",
      },
      is_tooltip: true,
      is_editable: true,
    },
    width: {
      field: "width",
      label: "列宽度",
      default: "",
      width: "80",
      params: {
        type: "text",
      },
      is_editable: true,
    },
    align: {
      field: "align",
      label: "对齐方式",
      default: "",
      width: "80",
      params: {
        type: "select",
        options: alignOptions,
      },
      is_editable: true,
    },
    sort_order: {
      field: "sort_order",
      label: "排序",
      default: "",
      width: "80",
      params: {
        type: "text",
      },
      is_editable: true,
    },
    fixed: {
      field: "fixed",
      label: "固定方向",
      default: "",
      width: "80",
      params: {
        type: "select",
        options: fixedOptions,
      },
      is_editable: true,
    },
    is_required: {
      field: "is_required",
      label: "必填",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_default: {
      field: "is_default",
      label: "默认开启",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_enable: {
      field: "is_enable",
      label: "是否开启",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_editable: {
      field: "is_editable",
      label: "表格编辑",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_tooltip: {
      field: "is_tooltip",
      label: "使用tooltip",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_resizable: {
      field: "is_resizable",
      label: "拖拽宽度",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    default: {
      field: "default",
      label: "默认值",
      default: "",
      width: "80",
      params: {
        type: "text",
      },
      is_editable: true,
    },
    operate: {
      field: "operate",
      label: "操作",
      default: "",
      width: "260",
      fixed: "right",
      align: "left",
      component: "operate",
    },
  },
  formOptions: {
    id: {
      input_type: "view-text",
      label: "自增ID",
    },
    key: {
      input_type: "view-text",
      label: "表头标志",
    },
    field: {
      input_type: "input-text",
      label: "字段名",
      rules: [{ type: "required" }],
    },
    label: {
      input_type: "input-text",
      label: "显示名",
      rules: [{ type: "required" }],
    },
    width: {
      input_type: "input-text",
      label: "固定宽度",
    },
    sort_order: {
      input_type: "input-number",
      label: "排序",
      rules: [{ type: "required" }, { type: "number", min: 0, max: 127 }],
    },
    description: {
      input_type: "input-area",
      label: "描述",
    },
    fixed: {
      input_type: "input-select",
      label: "列固定",
      exts: {
        clearable: true,
        options: fixedOptions,
      },
    },
    default: {
      input_type: "input-text",
      label: "默认值",
    },
    is_enable: {
      input_type: "ele-switch",
      label: "启用状态",
    },
    align: {
      input_type: "input-select",
      label: "对齐方式",
      exts: {
        clearable: true,
        options: alignOptions,
      },
    },
    is_required: {
      input_type: "ele-switch",
      label: "是否必选",
    },
    is_default: {
      input_type: "ele-switch",
      label: "默认开启",
    },
    is_tooltip: {
      input_type: "ele-switch",
      label: "使用tooltip",
    },
    is_editable: {
      input_type: "ele-switch",
      label: "表格编辑",
    },
    is_resizable: {
      input_type: "ele-switch",
      label: "开启拖动",
    },
    component: {
      input_type: "input-text",
      label: "组件",
    },
    options: {
      input_type: "json-editor",
      label: "字段映射",
    },
    params: {
      input_type: "json-editor",
      label: "参数内容",
    },
    operate_ip: {
      input_type: "view-text",
      label: "操作IP",
    },
    operate_uid: {
      input_type: "view-text",
      label: "操作UID",
    },
    created_at: {
      input_type: "view-text",
      label: "创建时间",
    },
    updated_at: {
      input_type: "view-text",
      label: "更新时间",
    },
  },
};
