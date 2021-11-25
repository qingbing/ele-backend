<template>
  <div>
    <!-- 标题区 -->
    <h4 class="page-title" v-if="pageTitle">{{ pageTitle }}</h4>
    <el-form
      :rules="rules"
      :model="entity"
      :ref="refForm"
      label-width="120px"
      label-position="right"
    >
      <!-- 表单选项区 -->
      <element-form
        :key="uniqueKey"
        :formData="entity"
        :items="items"
        :rules="rules"
        :viewFields="viewFields"
        :textFields="textFields"
      ></element-form>

      <el-form-item>
        <!-- 按钮操作区 -->
        <c-buttons
          :refForm="refForm"
          :buttons="buttons"
          :submitCallback="handleSave"
        ></c-buttons>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入包
import Router from "@/utils/router-helper";

// 导入包
export default {
  data() {
    return {
      uniqueKey: "",
      pageTitle: "操作",
      refForm: "operForm",
      entity: {}, // 当前操作实体
      rules: {}, // 规则，这个定义为数组，不用赋值
      items: {}, // 项目
      viewFields: [], // 需要展示的项目
      textFields: [], // 强制 view
      buttons: ["submit", "reset"], // 默认展示按钮
    };
  },
  components: {
    CButtons: () => import("@/components/formButton"),
  },
  methods: {
    // 关闭页面
    buttonCloseWindow() {
      Router.closeWin();
    },
    // 保存结果
    handleSave(successCb, failureCb) {
      console.log("save");
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: left;
  margin: 10px;
  font-weight: normal;
  height: 40px;
  line-height: 30px;
  padding: 5px 10px;
  font-size: 14px;
  border-left: 3px solid #31c17b;
}
</style>
