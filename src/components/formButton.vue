<template>
  <div>
    <el-button
      v-for="(item, idx) in buttons"
      :type="item.type"
      @click="item.handle($event, idx)"
      :key="uniqid + '_' + idx"
      >{{ item.label }}</el-button
    >
  </div>
</template>

<script>
// 导入
import {
  each,
  isUndefined,
  isEmpty,
  isObject,
  isFunction,
  dump,
  uniqid,
} from "@qingbing/helper";
// 导出
export default {
  props: {
    uniqid: {
      type: String,
      default: uniqid(),
    },
    refForm: {
      type: String,
      default: "form",
    },
    /**
     * button 按钮组
     */
    buttons: {
      type: Array,
      default: () => {
        return ["submit", "reset"];
      },
    },
    /**
     * 提交按钮配置
     */
    submitType: {
      type: String,
      default: "warning",
    },
    submitLabel: {
      type: String,
      default: "确认",
    },
    submitCallback: {
      type: Function,
    },
    /**
     * 提交按钮配置
     */
    cancelType: {
      type: String,
      default: "default",
    },
    cancelLabel: {
      type: String,
      default: "取消",
    },
    cancelCallback: {
      type: Function,
    },
    /**
     * 重置按钮配置
     */
    resetType: {
      type: String,
      default: "default",
    },
    resetLabel: {
      type: String,
      default: "重置",
    },
    resetCallback: {
      type: Function,
    },
  },
  data() {
    each(this.buttons, (item, idx) => {
      if ("submit" == item) {
        this.buttons[idx] = {
          type: this.submitType,
          label: this.submitLabel,
          handle: this.submitHandle,
        };
      } else if ("reset" == item) {
        this.buttons[idx] = {
          type: this.resetType,
          label: this.resetLabel,
          handle: this.resetHandle,
        };
      } else if ("cancel" == item) {
        this.buttons[idx] = {
          type: this.cancelType,
          label: this.cancelLabel,
          handle: this.cancelHandle,
        };
      } else if (!isObject(item)) {
        dump.error("组件 formButton 参数必须是JsonObject");
      } else if (isUndefined(item.label)) {
        dump.error("组件 formButton 对象参数必须指定 lable");
      } else {
        isUndefined(item.type) && (this.buttons[idx].type = "primary");
        isUndefined(item.label) && (this.buttons[idx].label = "Button");
        item.handle = this.commonHandle;
      }
    });
    return {
      submitLoading: false,
      formParent: undefined,
    };
  },
  methods: {
    // 获取操作表单
    getFormParent() {
      if (isUndefined(this.formParent)) {
        let formParent;
        let $vm = this;
        do {
          if ($vm.$refs[this.refForm]) {
            formParent = $vm;
            break;
          }
          $vm = $vm.$parent;
        } while ($vm);
        if (!formParent) {
          dump.error(`buttons 组件中 ${this.refForm} 未找到`);
        }
        this.formParent = formParent;
      }
      return this.formParent;
    },
    /**
     * 提交按钮句柄
     */
    submitHandle() {
      if (this.submitLoading) {
        return this.$message({
          message: "表单提交中，请勿重复提交",
          type: "warning",
        });
      }
      this.submitLoading = true;
      if (
        isFunction(this.submitCallback) &&
        this.getFormParent().$refs[this.refForm]
      ) {
        this.getFormParent().$refs[this.refForm].validate((valid) => {
          if (!valid) {
            this.submitLoading = false;
            return;
          }
          this.submitCallback.call(
            this.getFormParent(),
            (message) => {
              this.submitLoading = false;
              if (!isEmpty(message)) {
                this.$message({ type: "success", message });
              }
            },
            () => {
              this.submitLoading = false;
            }
          );
        });
      } else {
        // 后台数据处理
        this.submitLoading = false;
      }
    },
    /**
     * 取消按钮句柄
     */
    cancelHandle() {
      this.submitLoading = false;
      if (this.getFormParent().$refs[this.refForm]) {
        this.getFormParent().$refs[this.refForm].resetFields();
      }
      if (isFunction(this.cancelCallback)) {
        return this.cancelCallback.call(this.getFormParent(), this);
      }
    },
    /**
     * 重置按钮句柄
     */
    resetHandle() {
      this.submitLoading = false;
      if (isFunction(this.resetCallback)) {
        return this.resetCallback.call(this.getFormParent(), this);
      }
      this.getFormParent().$refs[this.refForm].resetFields();
    },
    /**
     * 普通按钮句柄
     */
    commonHandle(_, idx) {
      const buttonItem = this.buttons[idx];
      if (isFunction(buttonItem.callback)) {
        return buttonItem.callback.call(this.getFormParent());
      }
    },
  },
};
</script>
