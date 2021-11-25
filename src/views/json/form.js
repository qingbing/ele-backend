// 导入
import Labels from "./../../conf/labels";

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

// 用户字段
export default {
  category: {
    key: {
      input_type: "input-text",
      label: "表单标识",
      rules: [{ type: "required" }],
    },
    name: {
      input_type: "input-text",
      label: "表单名称",
      rules: [{ type: "required" }],
    },
    sort_order: {
      input_type: "input-number",
      label: "排序",
      rules: [{ type: "required" }, { type: "number", min: 0, max: 127 }],
    },
    is_open: {
      input_type: "ele-switch",
      label: "是否公开",
    },
    is_enable: {
      input_type: "ele-switch",
      label: "启用状态",
    },
    is_setting: {
      input_type: "input-select",
      label: "配置表单",
      exts: {
        options: Labels.yesNo,
      },
      rules: [{ type: "required" }, { type: "enum" }],
    },
    description: {
      input_type: "input-area",
      label: "描述",
      rules: [],
    },
  },
  options: {
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
