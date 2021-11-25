<template>
  <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="item in breads"
      :class="0 == item.idx ? 'line' : ''"
      :key="item.idx"
      :to="item.to"
      >{{ item.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
// 导入
import { each, isUndefined } from "@qingbing/helper";

// 导出
export default {
  data() {
    return {
      breads: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const curPath = this.$route.path;
      // 控制面板
      if ("/dashboard" == curPath) {
        this.breads = [
          {
            idx: 0,
            title: this.$route.meta.title,
            to: undefined,
          },
        ];
        return;
      }

      // 其它页面
      const routes = this.$route.matched.filter((item) => item.meta.title);
      const breads = [];
      each(routes, (val, idx) => {
        let to;
        if (isUndefined(val.meta.realPath)) {
          to = val.path == curPath ? undefined : val.path;
        } else {
          to = val.meta.realPath == curPath ? undefined : val.path;
        }
        breads.push({
          idx,
          title: val.meta.title,
          to: to,
        });
      });
      this.breads = breads;
    },
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 50px;
  line-height: 30px;
  padding: 10px 20px;
  font-weight: bolder;
  font-size: 16px;
}
.line {
  border-left: 5px solid #31c17b;
  padding-left: 10px;
}
</style>
