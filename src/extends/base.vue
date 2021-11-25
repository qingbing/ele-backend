<script>
// 导入包
import { isUndefined, dump } from "@qingbing/helper";
// 导出组件
export default {
  data() {
    return {
      openDialogRef: "",
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
        this.$refs[formName].resetFields();
      }
    },
    // 设置 dailog 为开启状态
    openDialog(name) {
      if (isUndefined(this[name])) {
        dump.error(`组件未设置名为 ${name} 的 dailog`);
      }
      this.openDialogRef = name;
      this[name].visible = true;
      // 表单重置
      if (!isUndefined(this.$refs[this[name].formRef])) {
        this.resetForm(this[name].formRef);
      }
    },
    // 设置 dailog 为关闭状态
    closeDialog(name) {
      if (isUndefined(this[name])) {
        this[this.openDialogRef].visible = false;
      } else {
        this[name].visible = false;
      }
    },
  },
};
</script>
