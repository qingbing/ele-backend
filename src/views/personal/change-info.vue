<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="left"
    >
      <element-form
        :isForm="isForm"
        :formData="formData"
        :items="items"
        :viewFields="viewFields"
        :textFields="textFields"
        :rules="rules"
      ></element-form>

      <el-form-item>
        <component-buttons
          refForm="form"
          :buttons="buttons"
          :submitCallback="handleSubmit"
        ></component-buttons>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入
import items from "./../json/user";
import { changeInfo } from "../../api/portal/personal";
import { success } from "../../utils/message";

// 导出
export default {
  data() {
    return {
      buttons: ["submit", "reset"],
      isForm: true,
      rules: {},
      formData: this.$store.getters.userInfo,
      items,
      viewFields: [
        "uid",
        "nickname",
        "real_name",
        "sex",
        "email",
        "mobile",
        "phone",
        "qq",
        "id_card",
        "birthday",
        "address",
        "zip_code",
        // "is_enable",
        // "is_super",
        // "refer_uid",
        "expire_ip",
        "expire_begin_at",
        "expire_end_at",
        // "login_times",
        // "last_login_ip",
        // "last_login_at",
        // "register_ip",
        // "register_at",
        // "updated_at",
        // "avatar",
      ],
      textFields: undefined,
    };
  },
  components: {
    componentButtons: () => import("./../../components/formButton"),
  },
  methods: {
    handleSubmit(cb) {
      changeInfo(this.formData)
        .then((res) => {
          success(res.msg);
          cb();
        })
        .catch(() => cb());
    },
  },
};
</script>
