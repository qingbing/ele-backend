<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.dialogWidth"
    append-to-body
  >
    <el-form
      :rules="dialog.rules"
      :model="dialog.entity"
      :ref="dialog.refForm"
      :label-width="dialog.labelWidth"
      :label-position="dialog.labelPosition"
      :style="{ width: dialog.formWidth }"
    >
      <element-form
        :formData="dialog.entity"
        :items="dialog.items"
        :rules="dialog.rules"
        :viewFields="dialog.viewFields"
        :textFields="dialog.textFields"
      ></element-form>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- dialog 操作按钮 -->
      <c-buttons
        :refForm="dialog.refForm"
        :buttons="dialog.buttons"
        :submitCallback="submitCallback"
        :cancelCallback="cancelCallback"
        :resetCallback="resetCallback"
      ></c-buttons>
    </div>
  </el-dialog>
</template>

<script>
// 导入
import { isUndefined } from "@qingbing/helper";
// 导出
export default {
  props: {
    /**
     * dialog 数据
     */
    dialog: {
      type: Object,
      required: true,
    },
    /**
     * 提交函数
     */
    submitCallback: {
      type: Function,
      default: () => {},
    },
    /**
     * 取消函数
     */
    cancelCallback: {
      type: Function,
      default: () => {},
    },
    /**
     * 重置函数
     */
    resetCallback: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    CButtons: () => import("./formButton"),
  },
  data() {
    // 标题
    if (isUndefined(this.dialog.title)) {
      this.dialog.title = "";
    }
    // 开启状态
    if (isUndefined(this.dialog.visible)) {
      this.dialog.visible = false;
    }
    // dialog 宽度
    if (isUndefined(this.dialog.dialogWidth)) {
      this.dialog.dialogWidth = "800px";
    }
    // form 宽度
    if (isUndefined(this.dialog.formWidth)) {
      this.dialog.formWidth = "700px";
    }
    // label 宽度
    if (isUndefined(this.dialog.labelWidth)) {
      this.dialog.labelWidth = "120px";
    }
    // label 位置
    if (isUndefined(this.dialog.labelPosition)) {
      this.dialog.labelPosition = "right";
    }
    // 表单 验证规则
    if (isUndefined(this.dialog.rules)) {
      this.dialog.rules = {};
    }
    // 表单的 ref
    if (isUndefined(this.dialog.ref)) {
      this.dialog.ref = undefined;
    }
    // 数据实体
    if (isUndefined(this.dialog.entity)) {
      this.dialog.entity = {};
    }
    // 展示字段
    if (isUndefined(this.dialog.viewFields)) {
      this.dialog.viewFields = [];
    }
    // 强制查看字段
    if (isUndefined(this.dialog.textFields)) {
      this.dialog.textFields = [];
    }
    return {};
  },
};
</script>
