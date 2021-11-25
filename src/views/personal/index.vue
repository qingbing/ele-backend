<template>
  <div>
    <el-form
      ref="formData"
      :model="formData"
      label-width="120px"
      label-position="left"
    >
      <element-form
        :isForm="isForm"
        :formData="formData"
        :items="items"
        :viewFields="viewFields"
        :textFields="textFields"
      ></element-form>
    </el-form>
  </div>
</template>

<script>
// 导入
import items from "./../json/user";

// 导出
export default {
  data() {
    return {
      rules: {},
      isForm: false,
      formData: this.$store.getters.userInfo,
      items,
      viewFields: undefined,
      textFields: undefined,
    };
  },
  components: {},
  methods: {},
};
</script>
