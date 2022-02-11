// 导入
import Labels from "@/conf/labels";
// 用户字段
export default {
  searchItems: {
    code: {
      input_type: "input-text",
      label: "系统代码",
    },
    name: {
      input_type: "input-text",
      label: "系统名称",
    },
    type: {
      input_type: "input-select",
      label: "系统类型",
      exts: {
        options: Labels.business.systemTypes,
      },
    },
    is_enable: {
      dataType: "enable",
      // input_type: "input-select",
      // label: "启用状态",
      // exts: {
      //   options: Labels.enable,
      // },
    },
    is_allow_new_interface: {
      input_type: "input-select",
      label: "接受新接口",
      exts: {
        options: Labels.yesNo,
      },
    },
    is_record_field: {
      input_type: "input-select",
      label: "记录新字段",
      exts: {
        options: Labels.yesNo,
      },
    },
    is_open_validate: {
      input_type: "input-select",
      label: "接口校验",
      exts: {
        options: Labels.enable,
      },
    },
    is_strict_validate: {
      input_type: "input-select",
      label: "严格校验",
      exts: {
        options: Labels.enable,
      },
    },
  },
  tableHeaders: {
    _idx: {
      field: "_idx",
      label: "序号",
      default: "",
      width: "50",
      fixed: "left",
    },
    type: {
      field: "type",
      label: "系统规则",
      default: "",
      width: "100",
      align: "left",
      options: Labels.business.systemTypes,
      is_tooltip: true,
    },
    code: {
      field: "code",
      label: "系统别名",
      default: "",
      width: "100",
      align: "left",
    },
    name: {
      field: "name",
      label: "系统名称",
      default: "",
      width: "120",
      align: "left",
    },
    uri_prefix: {
      field: "uri_prefix",
      label: "URI前缀",
      default: "",
      width: "150",
      align: "left",
      is_tooltip: true,
    },
    sort_order: {
      field: "sort_order",
      label: "排序",
      default: "",
      width: "80",
      align: "left",
    },
    is_enable: {
      field: "is_enable",
      label: "启用",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_allow_new_interface: {
      field: "is_allow_new_interface",
      label: "接受新接口",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_record_field: {
      field: "is_record_field",
      label: "记录新字段",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_open_validate: {
      field: "is_open_validate",
      label: "开启接口校验",
      default: "",
      width: "80",
      params: {
        type: "switch",
      },
      is_editable: true,
    },
    is_strict_validate: {
      field: "is_strict_validate",
      label: "开启严格校验",
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
      field: "id",
      label: "ID",
      input_type: "view-text",
      default: "",
    },
    code: {
      field: "code",
      label: "系统代码",
      input_type: "input-text",
      default: "",
      rules: [
        {
          type: "required",
        },
      ],
    },
    name: {
      field: "name",
      label: "系统名称",
      input_type: "input-text",
      default: "",
      rules: [
        {
          type: "required",
        },
      ],
    },
    description: {
      field: "description",
      label: "描述",
      input_type: "input-area",
      default: "",
    },
    uri_prefix: {
      field: "uri_prefix",
      label: "URI前缀",
      input_type: "input-text",
      default: "",
    },
    type: {
      field: "type",
      label: "系统类型",
      input_type: "input-select",
      default: "",
      exts: {
        options: Labels.business.systemTypes,
      },
      rules: [
        {
          type: "required",
        },
      ],
    },
    proxy_id: {
      field: "proxy_id",
      label: "代理组件ID",
      input_type: "input-text",
      default: "",
    },
    ext: {
      field: "ext",
      label: "扩展数据",
      input_type: "json-editor",
      default: "",
    },
    is_enable: {
      field: "is_enable",
      label: "启用状态",
      input_type: "ele-switch",
      default: "",
    },
    is_allow_new_interface: {
      field: "is_allow_new_interface",
      label: "接受新接口",
      input_type: "ele-switch",
      default: "",
    },
    is_record_field: {
      field: "is_record_field",
      label: "记录新字段",
      input_type: "ele-switch",
      default: "",
    },
    is_open_validate: {
      field: "is_open_validate",
      label: "开启接口校验",
      input_type: "ele-switch",
      default: "",
    },
    is_strict_validate: {
      field: "is_strict_validate",
      label: "开启严格校验",
      input_type: "ele-switch",
      default: "",
    },
    sort_order: {
      field: "sort_order",
      label: "排序",
      input_type: "input-number",
      default: "127",
      rules: [
        {
          type: "required",
        },
      ],
    },
    updated_at: {
      field: "updated_at",
      label: "更新时间",
      input_type: "view-text",
      default: "",
    },
    created_at: {
      field: "created_at",
      label: "创建时间",
      input_type: "view-text",
      default: "",
    },
  },
};
