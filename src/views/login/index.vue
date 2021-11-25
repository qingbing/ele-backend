<template>
  <div class="login-container">
    <h2 class="login-title">小Z后台管理</h2>
    <el-form
      class="login-form"
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <element-form
        :formData="formData"
        :items="items"
        :rules="rules"
      ></element-form>

      <el-form-item>
        <component-buttons
          refForm="form"
          :buttons="buttons"
          :submitLabel="submitLabel"
          :submitCallback="submitCallback"
        ></component-buttons>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入包
import { getSupportTypes } from "./../../api/login";
import { success } from "./../../utils/message";

// 导出
export default {
  data() {
    const items = {
      type: {
        input_type: "input-select",
        field: "type",
        label: "登录类型",
        default: "email",
        exts: { options: {} },
        rules: [{ type: "required" }],
      },
      account: {
        input_type: "input-text",
        field: "account",
        label: "登录账户",
        rules: [{ type: "required" }],
      },
      password: {
        input_type: "input-password",
        field: "password",
        label: "登录密码",
        exts: { showPassword: true },
        rules: [{ type: "required" }, { type: "password" }],
      },
    };
    const formData = {
      type: "email",
      account: "top-world@qq.com",
      password: "CDxx111111",
    };

    return {
      buttons: ["submit", "reset"],
      submitLabel: "提交",
      rules: {},
      formData,
      items,
    };
  },
  created() {
    getSupportTypes()
      .then((res) => {
        this.items.type.exts.options = res.data;
      })
      .catch((err) => err);
  },
  components: {
    componentButtons: () => import("./../../components/formButton"),
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      // watch 默认当值第一次绑定的时候，不会执行监听函数，如果需要绑定值的时候也执行函数，则就需要用到 immediate 属性
      immediate: true,
    },
  },
  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    submitCallback(cb) {
      // 登录
      this.$store
        .dispatch("user/login", this.formData)
        .then(() => {
          success("登录成功");
          // 登录成功，跳转到refer路由或首页
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery,
          });
          cb();
        })
        .catch(() => cb());
    },
  },
};
</script>

<style>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #001528;
}
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>
