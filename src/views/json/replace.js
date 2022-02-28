// 导入
import Labels from "@/conf/labels";
// 选项-系统管理
export default {
  searchItems: {
    code: {
      input_type: "input-text",
      label: "标识码",
    },
    name: {
      input_type: "input-text",
      label: "配置名称",
    },
    is_open: {
      input_type: "input-select",
      label: "是否开放",
      exts: {
        options: Labels.yesNo,
      },
    },
  },
};
