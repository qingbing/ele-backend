// 选项-系统管理
export default {
  searchItems: {
    queryTime: {
      input_type: "date-picker",
      label: "接口创建时间",
      exts: {
        type: "datetimerange",
        clearable: false,
      },
    },
    system_code: {
      input_type: "input-select",
      label: "所属系统",
      exts: {
        clearable: true,
        options: {},
      },
    },
    id: {
      input_type: "input-text",
      label: "日志ID",
    },
    trace_id: {
      input_type: "input-text",
      label: "Trace-ID",
    },
    type: {
      input_type: "input-text",
      label: "操作类型",
    },
    keyword: {
      input_type: "input-text",
      label: "关键字",
    },
    ip: {
      input_type: "input-text",
      label: "访问IP",
    },
    nickname: {
      input_type: "input-text",
      label: "昵称",
    },
    uid: {
      input_type: "input-text",
      label: "UID",
    },
    message: {
      input_type: "input-text",
      label: "日志消息",
    },
  },
};
