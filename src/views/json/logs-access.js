// 导入
import Labels from "@/conf/labels";
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
      label: "系统",
      exts: {
        clearable: true,
        options: {},
      },
    },
    url_path: {
      input_type: "input-text",
      label: "接口path",
    },
    trace_id: {
      input_type: "input-text",
      label: "Trace-ID",
    },
    method: {
      input_type: "input-select",
      label: "接口分类",
      exts: {
        clearable: true,
        options: {
          post: "POST",
          get: "GET",
          put: "PUT",
        },
      },
    },
    is_success: {
      input_type: "input-select",
      label: "是否成功",
      exts: {
        clearable: true,
        options: Labels.yesNo,
      },
    },
    ip: {
      input_type: "input-text",
      label: "访问IP",
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
