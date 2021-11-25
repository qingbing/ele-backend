<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back"
      >返回</el-button
    >
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">你没有权限去该页面!</h1>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li>
            <router-link to="/">
              <i class="el-icon-s-home"></i>首页
            </router-link>
          </li>
          <li>
            <router-link to="/personal">
              <i class="el-icon-user-solid"></i>个人中心
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";

export default {
  name: "Page401",
  data() {
    return {
      errGif: errGif + "?" + +new Date()
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .text-jumbo {
    font-size: 40px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    list-style: none;
    font-size: 14px;
    li {
      padding-bottom: 5px;
      line-height: 40px;
      font-weight: 600;
      font-size: 20px;
      text-align: left;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
