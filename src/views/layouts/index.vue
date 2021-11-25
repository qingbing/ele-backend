<template>
  <el-container class="zf-container">
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <app-menu></app-menu>
      <el-main>
        <app-breadcrumb v-show="true"></app-breadcrumb>
        <div class="main-content"><router-view></router-view></div>
      </el-main>
    </el-container>
    <el-footer>
      <app-footer></app-footer>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    appHeader: () => import("./components/header"),
    appBreadcrumb: () => import("./components/breadcrumb"),
    appMenu: () => import("./components/menu"),
    appFooter: () => import("./components/footer"),
  },
  methods: {},
};
</script>

<style lang="scss">
$white: #ffffff;

.zf-container,
.zf-container .el-header,
.zf-container .el-container,
.zf-container .el-footer {
  position: fixed;
  overflow: hidden;
  width: 100%;
  z-index: 1;
  margin: 0;
  padding: 0;
}
.zf-container .el-header,
.zf-container .el-footer {
  background-color: #2d3a4b;
  color: #333;
  text-align: center;
}
.zf-container .el-header {
  top: 0;
}
.zf-container .el-footer {
  bottom: 0;
  color: $white;
}
.zf-container .el-container {
  top: 60px;
  bottom: 60px;
}
.zf-container .el-container .el-aside {
  padding: 0;
  background-color: #545c64;
  height: 100%;
}
.zf-container .el-container .el-main {
  position: relative;
  padding: 0 10px;
  height: 100%;
}
#app .el-form-item .el-form-item__content {
  text-align: left;
}
.main-content {
  margin: 10px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.query-form {
  text-align: left;
}
</style>
