<template>
  <element-form :formData="query" :items="items" :rules="rules"></element-form>
</template>

<script>
// 导入
import { each, isUndefined, dump } from "@qingbing/helper";
import Labels from "@/conf/labels";
// 导出
export default {
  props: {
    // 表单数据对象
    query: {
      required: true,
      type: Object,
    },
    // 表单配置，参考 element-form
    items: {
      required: true,
      type: Object,
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    each(this.items, (item) => {
      // 设置了数据源
      if (!isUndefined(item.dataType)) {
        this.dataType(item);
      }
    });
    return {};
  },
  methods: {
    dataType: (item) => {
      const dataType = item.dataType;
      const options = Labels[dataType];
      if (isUndefined(options)) {
        dump.error(`不支持的数据源类型${dataType}`);
      }
      if (isUndefined(item.input_type)) {
        item.input_type = "input-select";
      }
      if (isUndefined(item.exts)) {
        item.exts = {
          clearable: true,
        };
      }
      if (isUndefined(item.exts.options)) {
        item.exts.options = options;
      }
      if (isUndefined(item.label)) {
        switch (item.dataType) {
          case "sex":
            item.label = "性别";
            break;
          case "yesNo":
            item.label = "是否选择";
            break;
          case "forbidden":
            item.label = "禁用状态";
            break;
          case "enable":
            item.label = "开启状态";
            break;
          case "deleted":
            item.label = "删除状态";
            break;
        }
      }
    },
  },
};
</script>
