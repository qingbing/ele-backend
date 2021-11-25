<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-collapse" @click="handleCollapse()">
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
    <el-menu
      class="zf-menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      router
    >
      <template v-for="(item, mainI) in items">
        <!-- 菜单下有子菜单 -->
        <el-submenu
          v-if="item.subItems && item.subItems.length > 0"
          :key="mainI"
          :index="item.route"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subI) in item.subItems"
            :index="subItem.route"
            :key="'menu' + mainI + '-' + subI"
          >
            <i :class="subItem.icon"></i>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 只有一级菜单 -->
        <el-menu-item v-else :key="mainI" :index="item.route">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
// 引入包
import { isArray } from "@qingbing/helper";
// 默认导出
export default {
  data() {
    return {
      menus: this.$store.getters.menus,
      isCollapse: this.$store.getters.menuCollapse || false,
      mainNav: {},
      items: [],
    };
  },
  created() {
    this.onRouteChanged();
  },
  methods: {
    onRouteChanged() {
      // 当前路由
      const cPath = this.$route.path;
      // 设置主导航选择
      let mainNav = this.menus.find(
        (item) =>
          isArray(item.allowRoutes) && item.allowRoutes.indexOf(cPath) >= 0
      );
      if (!mainNav) {
        mainNav = this.menus[0];
      }
      if (mainNav !== this.mainNav) {
        this.mainNav = mainNav;
        this.items = mainNav.subItems;
      }
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$store.dispatch("app/setMenuCollapse", this.isCollapse);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "onRouteChanged",
  },
};
</script>

<style lang="scss">
.zf-menu {
  text-align: left;
  border: none;
}
.zf-menu:not(.el-menu--collapse) {
  width: 200px;
}
.toggle-collapse {
  background-color: #545c64;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
  color: #ffffff;
  font-size: 35px;
  line-height: 60px;
}
</style>
