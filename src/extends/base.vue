<script>
// 导入包
import { isUndefined, isArray, isObject, dump } from "@qingbing/helper";
// 导出组件
export default {
  data() {
    return {
      openedDialog: undefined,
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  methods: {
    // 重置表单
    resetForm(formName) {
      // 重置会看 el-form-item 组件元素上是否用 prop 指定了字段名，指定了重置才会生效
      if (isUndefined(this.$refs[formName])) {
        dump.error(`${formName} 不是有效的的 form`);
      } else {
        if (isArray(this.$refs[formName])) {
          this.$refs[formName][0].resetFields();
        } else {
          this.$refs[formName].resetFields();
        }
      }
    },
    // 设置 dialog 为开启状态
    openDialog(dialog) {
      if (isObject(dialog)) {
        // 传递的是dialog配置对象
        this.openedDialog = dialog;
      } else if (isUndefined(this[dialog])) {
        dump.error(`组件未设置名为 ${name} 的 dialog`);
        return;
      } else {
        // 传递的是配置在this上的dialog配置键
        this.openedDialog = this[dialog];
      }
      this.openedDialog.visible = true;
      if (!isUndefined(this.$refs[this.openedDialog.formRef])) {
        this.resetForm(this.openedDialog.formRef);
      }
    },
    // 设置 dialog 为关闭状态
    closeDialog(dialog) {
      if (isObject(dialog)) {
        // 传递的是dialog配置对象
        dialog.visible = false;
        this.openedDialog = undefined;
      } else if (isUndefined(this[dialog]) && !isUndefined(this.openedDialog)) {
        // 设置了打开的dialog
        this.openedDialog.visible = false;
        this.openedDialog = undefined;
      }
    },
  },
};
</script>
