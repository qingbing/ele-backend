// 定义输出类型变量
const inputTypes = {
  "view-text": "显示",
  "input-text": "文本框",
  "input-password": "密码框",
  "input-area": "文本域",
  "input-number": "文本数字",
  "input-radio": "单选组",
  "input-checkbox": "复选组",
  "input-select": "下拉框",
  "ele-switch": "开关按钮",
  "ele-cascader": "级联",
  "ele-slider": "滑块",
  "ele-rate": "评分",
  "ele-color": "颜色",
  "ele-uploader": "上传",
  "time-picker": "时间组件",
  "date-picker": "日期组件",
  "auto-complete": "建议输入",
  "json-editor": "JSON编辑",
  "vue-editor": "富文本编辑",
};

// 选项-表头类型管理
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
      label: "字段",
      default: "",
      width: "100",
      fixed: "left",
      align: "left",
      is_tooltip: true,
    },
    label: {
      field: "label",
      label: "字段名",
      default: "",
      width: "150",
      align: "left",
      params: {
        type: "text",
      },
      is_tooltip: true,
      is_editable: true,
    },
    input_type: {
      field: "input_type",
      label: "表单类型",
      default: "",
      width: "100",
      align: "left",
      options: inputTypes,
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
    default: {
      field: "default",
      label: "默认值",
      default: "",
      width: "100",
      params: {
        type: "text",
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
      label: "表单标志",
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
    input_type: {
      input_type: "input-select",
      label: "输入类型",
      exts: {
        clearable: true,
        options: inputTypes,
      },
      rules: [{ type: "required" }],
    },
    is_enable: {
      input_type: "ele-switch",
      label: "启用状态",
    },
    is_required: {
      input_type: "ele-switch",
      label: "是否必选",
    },
    required_msg: {
      input_type: "input-area",
      label: "必填提示",
    },
    sort_order: {
      input_type: "input-number",
      label: "排序",
      rules: [{ type: "required" }, { type: "number", min: 0, max: 127 }],
    },
    default: {
      input_type: "input-text",
      label: "默认值",
    },
    description: {
      input_type: "input-area",
      label: "描述",
    },
    rules: {
      input_type: "json-editor",
      label: "验证规则",
    },
    exts: {
      input_type: "json-editor",
      label: "扩展信息",
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
