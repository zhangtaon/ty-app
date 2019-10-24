<template>
  <el-container class="app">
    <el-header height="72px">
      <div class="box-between-center">
        <div class="box-between-center logo">
          <img src="./image/logo-header.png" alt />
          <span>{{systemName}}</span>
        </div>
        <div class="operate">
          <router-link to="/gis">
            <img src="./image/home.png" alt />
          </router-link>
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
import TyMenuTree from "./component/menu/tyMenuTree.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      menus: state => state.menu.menus
    })
  },
  data() {
    return {
      systemName: require("../../../package.json").description
    };
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
// 两边垂直居中
.box-between-center {
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: space-between; //两侧的间隔相等
  align-items: center; //垂直居中
  flex-direction: row; //从左到右
  height: 100%;
}
// 左右垂直居中
.box-center {
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: center; //两侧的间隔相等
  align-items: center; //垂直居中
  flex-direction: row; //从左到右
  height: 100%;
}
.app {
  .el-header {
    background-color: #273342;
    height: 72px;
    .logo {
      font-family: AlibabaPuHuiTi-Medium;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 34px;
      // width: 400px;
      img {
        width: 34px;
      }
    }
    .operate {
      a {
        width: 65px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .el-aside {
    background-color: #f6f6f6;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu-item,
    .el-submenu {
      text-align: left;
    }
    .el-submenu__title,
    .el-menu-item {
      font-size: 20px;
      background-color: #f6f6f6;
    }
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
  height: 100%;
}
</style>
