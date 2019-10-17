<template>
  <el-container class="app">
    <el-header height="72px">
      <div class="box">
        <div class="media">
          <div class="media-left">
            <img src="./image/logo-header.png" alt />
          </div>
          <div class="media-body media-middle">TY智能化工管理系统</div>
        </div>
        <div class="operate">
          <router-link to="/gis"><img src="./image/home.png" alt /></router-link>
          <a>
            <img src="./image/menu.png" alt />
          </a>
          <a>
            <img src="./image/alarm.png" alt />
          </a>
          <a>
            <img src="./image/info.png" alt />
          </a>
          <a @click="logout()">
            <img src="./image/crm.png" alt />
          </a>
        </div>
      </div>
      <!-- <el-button type="primary" @click="logout()">退出</el-button> -->
    </el-header>
    <el-container>
      <el-aside width="304px">
        <ty-menu-tree :menus="menus"></ty-menu-tree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { TyMenuTree } from "ty-component";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      menus: state => state.menu.menus
    })
  },
  components: {
    TyMenuTree
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
.app {
  .el-menu-item,
  .el-submenu {
    text-align: left;
  }
  .el-submenu__title,
  .el-menu-item{
    font-size: 20px;
    background-color: #F6F6F6
  }

  .el-row {
    // line-height: 40px;
    font-size: 14px;
  }
  .el-header {
    background-color: #273342;
    height: 72px;
    .box {
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between; //两侧的间隔相等
      align-items: center; //垂直居中
      flex-direction: row; //从左到右
      height: 100%;
    }
    .media {
      font-family: AlibabaPuHuiTi-Medium;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 34px;
      width: 400px;
      img {
        width: 34px;
      }
    }
    .operate {
      a {
        width: 65px;
        height: 72px;
        line-height: 72px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .el-aside {
    background-color: #F6F6F6;;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  // body > .el-container {
  margin-bottom: 40px;
  height: 100%;
  // }
  .el-icon-delete {
    margin-left: 10px;
  }
}
</style>
