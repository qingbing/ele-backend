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
import { resetPassword } from "../../api/personal";
import { success, warning } from "../../utils/message";
import { col_cloumn } from "@qingbing/helper";

// 导出
export default {
  data() {
    const items = {
      uid: {
        input_type: "view-text",
        field: "uid",
        default: "",
        label: "UID",
      },
      nickname: {
        input_type: "view-text",
        field: "nickname",
        default: "",
        label: "昵称",
      },
      oldPassword: {
        input_type: "input-text",
        field: "oldPassword",
        default: "",
        label: "旧密码",
        exts: {
          showPassword: true, // 密码输入
        },
        rules: [{ type: "required" }],
      },
      newPassword: {
        input_type: "input-text",
        field: "newPassword",
        default: "",
        label: "新密码",
        exts: {
          showPassword: true, // 密码输入
        },
        rules: [{ type: "required" }, { type: "password" }],
      },
      confirmPassword: {
        input_type: "input-text",
        field: "confirmPassword",
        default: "",
        label: "确认密码",
        exts: {
          showPassword: true, // 密码输入
        },
        rules: [
          { type: "required" },
          { type: "password" },
          {
            type: "compare",
            compareField: "newPassword",
            message: "密码确认不正确",
          },
        ],
      },
    };
    const formData = col_cloumn(items, "default", "field");
    const userInfo = this.$store.getters.userInfo;
    formData.uid = userInfo.uid;
    formData.nickname = userInfo.nickname;
    return {
      buttons: ["submit", "reset"],
      isForm: true,
      rules: {},
      formData,
      items,
      textFields: undefined,
      viewFields: undefined,
    };
  },
  components: {
    componentButtons: () => import("./../../components/formButton"),
  },
  methods: {
    handleSubmit(cb) {
      resetPassword(this.formData)
        .then((res) => {
          cb();
          success(res.msg);
          this.$store
            .dispatch("user/logout")
            .then(async () => {
              this.$router.push("/login");
            })
            .catch((err) => {
              warning(err.message, {
                duration: 500, //停留时间
              });
            });
        })
        .catch(() => cb());
    },
  },
};
</script>
