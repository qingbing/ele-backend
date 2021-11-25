<template>
  <el-dialog
    :title="dailog.title"
    :visible.sync="dailog.visible"
    :width="dailog.dailogWidth"
    append-to-body
  >
    <el-form
      :rules="dailog.rules"
      :model="dailog.entity"
      :ref="dailog.refForm"
      :label-width="dailog.labelWidth"
      :label-position="dailog.labelPosition"
      :style="{ width: dailog.formWidth }"
    >
      <element-form
        :formData="dailog.entity"
        :items="dailog.items"
        :rules="dailog.rules"
        :viewFields="dailog.viewFields"
        :textFields="dailog.textFields"
      ></element-form>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- dailog 操作按钮 -->
      <c-buttons
        :refForm="dailog.refForm"
        :buttons="dailog.buttons"
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
     * dailog 数据
     */
    dailog: {
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
    if (isUndefined(this.dailog.title)) {
      this.dailog.title = "";
    }
    // 开启状态
    if (isUndefined(this.dailog.visible)) {
      this.dailog.visible = false;
    }
    // dailog 宽度
    if (isUndefined(this.dailog.dailogWidth)) {
      this.dailog.dailogWidth = "800px";
    }
    // form 宽度
    if (isUndefined(this.dailog.formWidth)) {
      this.dailog.formWidth = "700px";
    }
    // label 宽度
    if (isUndefined(this.dailog.labelWidth)) {
      this.dailog.labelWidth = "120px";
    }
    // label 位置
    if (isUndefined(this.dailog.labelPosition)) {
      this.dailog.labelPosition = "right";
    }
    // 表单 验证规则
    if (isUndefined(this.dailog.rules)) {
      this.dailog.rules = {};
    }
    // 表单的 ref
    if (isUndefined(this.dailog.ref)) {
      this.dailog.ref = undefined;
    }
    // 数据实体
    if (isUndefined(this.dailog.entity)) {
      this.dailog.entity = {};
    }
    // 展示字段
    if (isUndefined(this.dailog.viewFields)) {
      this.dailog.viewFields = [];
    }
    // 强制查看字段
    if (isUndefined(this.dailog.textFields)) {
      this.dailog.textFields = [];
    }
    return {};
  },
};
</script>
