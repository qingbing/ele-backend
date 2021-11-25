<template>
  <span>
    <template v-for="(button, idx) in params.buttons">
      <el-link
        v-if="
          !button.showProperty ||
          !button.showValue ||
          row[button.showProperty] == button.showValue
        "
        :key="idx"
        :type="button.type"
        @click="handle(idx)"
      >
        [ {{ button.label }} ]
      </el-link>
    </template>
  </span>
</template>

<script>
// 导入包
import {
  isUndefined,
  isEmpty,
  isFunction,
  isArray,
  isObject,
  each,
  dump,
} from "@qingbing/helper";
// 导出
export default {
  props: {
    scope: {
      type: Object,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
    property: {
      type: String,
      require: true,
    },
    row: {
      type: Object,
      require: false,
    },
    params: {
      type: Object,
      require: true,
      default: () => {
        return {};
      },
    },
  },
  data() {
    if (!isArray(this.params.buttons)) {
      this.params.buttons = [];
    }
    each(this.params.buttons, (button) => {
      if (!isObject(button)) {
        dump.error(`组件 operate 必须设置为对象数组`);
        return;
      }
      if (!isFunction(button.operType)) {
        switch (button.operType) {
          case "view":
            button.label = "详情";
            button.type = "info";
            break;
          case "edit":
            button.label = "编辑";
            button.type = "warning";
            break;
          case "delete":
            button.label = "删除";
            button.type = "danger";
            button.isDelete = true;
            break;
        }
      }
      if (isUndefined(button.label) || isUndefined(button.handle)) {
        dump.error(`组件 operate[] 必须设置 label 和 handle`);
        return;
      }
      if (!isFunction(button.handle)) {
        dump.error(`组件 operate[].handle 必须是一个函数`);
      }
      if (isUndefined(button.type)) {
        button.type = "primary";
      }
      if (isUndefined(button.isDelete)) {
        button.isDelete = false;
      }
    });

    const confirmText =
      this.params.confirmText ??
      "数据一旦删除将无法恢复，确认要执行删除操作么？";
    const confirmTip = this.params.confirmTip ?? "操作提示";
    const confirmButtonText = this.params.confirmButtonText ?? "确定";
    const cancelButtonText = this.params.cancelButtonText ?? "取消";
    const operSuccessTip = this.params.operSuccessTip ?? "操作成功 ^_^";
    const operFailureTip = this.params.operFailureTip ?? "操作失败 $_$";
    return {
      confirmText,
      confirmTip,
      confirmButtonText,
      cancelButtonText,
      operSuccessTip,
      operFailureTip,
    };
  },
  methods: {
    handle(idx) {
      const button = this.params.buttons[idx];
      if (button.isDelete) {
        this.handDelete(button);
      } else {
        button.handle(
          this.row,
          (message) => {
            if (isEmpty(message)) {
              message = this.operSuccessTip;
            }
            this.$message({ type: "success", message });
          },
          () => {}
        );
      }
    },
    handDelete(buttonConf) {
      this.$confirm(this.confirmText, this.confirmTip, {
        confirmButtonText: this.confirmButtonText,
        cancelButtonText: this.cancelButtonText,
        type: "warning",
      })
        .then(() => {
          buttonConf.handle(
            this.row,
            (message) => {
              if (isEmpty(message)) {
                message = this.operSuccessTip;
              }
              this.$message({ type: "success", message });
            },
            () => {}
          );
        })
        .catch(() => {});
    },
  },
};
</script>
