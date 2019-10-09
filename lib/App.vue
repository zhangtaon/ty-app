<template>
  <el-container class="app">
    <el-header>*********有限公司</el-header>
    <el-container>
      <el-aside width="200px">
        <ty-menu-tree :menus="menus"></ty-menu-tree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { TyMenuTree } from "ty-componeny";
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
  created() {
    this.getMenus();
  },
  methods: {
    ...mapActions(["getMenus"])
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
  .el-row {
    // line-height: 40px;
    font-size: 14px;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: rgb(84, 92, 100);
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
