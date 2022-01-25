<template>
  <div>
    <div class="logo">
      <a href="#/">
        <img src="@/assets/logo.png" />
      </a>
    </div>
    <div class="nav">
      <el-menu
        :default-active="navIndex"
        mode="horizontal"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          v-for="(item, index) in menus"
          :index="item.route"
          :key="index"
          >{{ item.label }}</el-menu-item
        >
      </el-menu>
    </div>
    <div class="short">
      <el-menu
        :default-active="shortIndex"
        mode="horizontal"
        @select="handleShortSelect"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="system">
          <template slot="title">
            {{
              $store.getters.userInfo ? $store.getters.userInfo.nickname : ""
            }}
          </template>
          <el-menu-item index="personalInfo">
            <i class="el-icon-info"></i>个人信息
          </el-menu-item>
          <el-menu-item index="changeInfo">
            <i class="el-icon-edit"></i>修改信息
          </el-menu-item>
          <el-menu-item index="resetPassword">
            <i class="el-icon-edit"></i>重置密码
          </el-menu-item>
          <el-menu-item index="clearCache">
            <i class="el-icon-delete"></i>清除缓存
          </el-menu-item>
          <el-menu-item index="logout">
            <i class="el-icon-info"></i>退出系统
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
// 引入包
import { clearCache } from "../../../api/portal/public";
import { isArray } from "@qingbing/helper";
import { success, warning } from "./../../../utils/message";

export default {
  data() {
    return {
      menus: this.$store.getters.menus,
      navIndex: "",
      shortIndex: "",
    };
  },
  created() {
    this.onRouteChanged();
  },
  methods: {
    onRouteChanged() {
      // 设置选择快捷导航
      const cPath = this.$route.path;
      if ("/personal/index" == cPath) {
        this.shortIndex = "personalInfo";
      } else if ("/personal/change-info" == cPath) {
        this.shortIndex = "changeInfo";
      } else if ("/reset-password" == cPath) {
        this.shortIndex = "resetPassword";
      } else {
        this.shortIndex = null;
      }
      // 设置主导航选择
      const curNav = this.menus.find(
        (item) =>
          isArray(item.allowRoutes) && item.allowRoutes.indexOf(cPath) >= 0
      );
      if (curNav) {
        this.navIndex = curNav.route;
      }
    },
    handleShortSelect(key) {
      switch (key) {
        case "personalInfo":
          this.$router.push("/personal/index");
          break;
        case "changeInfo":
          this.$router.push("/personal/change-info");
          break;
        case "resetPassword":
          this.$router.push("/personal/reset-password");
          break;
        case "clearCache":
          this.shortIndex = null;
          clearCache()
            .then((res) => {
              success(res.msg);
            })
            .catch((err) => err);
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(async () => {
          success("成功退出系统");
          this.$router.push("/login");
        })
        .catch((err) => {
          warning(err.message, {
            duration: 500, //停留时间
          });
        });
    },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "onRouteChanged",
  },
};
</script>

<style scoped>
.logo {
  float: left;
  margin-left: 10px;
  line-height: 50px;
  color: #ffffff;
  font-size: 20px;
}
.logo img {
  height: 40px;
  margin-top: 10px;
}
.nav {
  float: left;
  margin-left: 20px;
}
.short {
  float: right;
  margin-right: 10px;
}
</style>
