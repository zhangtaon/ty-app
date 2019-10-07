<template>
  <el-container class="app">
    <el-header>*********有限公司</el-header>
    <el-container>
      <el-aside width="200px">
        <ty-menu-tree :menus="menus"></ty-menu-tree>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeTabIndex" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="item in tabs"
            :key="item.title"
            :label="item.title"
            :name="item.tabIndex"
          >
            <component :is="item.component" :params="item.params"></component>
          </el-tab-pane>
        </el-tabs>
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
      menus: state => state.menu.menus,
      routes: state => state.menu.routes,
      tabs: state => state.menu.tabs
    }),
    activeTabIndex: {
      get() {
        return this.$store.state.menu.activeTabIndex;
      },
      set(val) {
        this.$store.commit("setActiveTabIndex", val);
      }
    }
  },
  components: {
    TyMenuTree
  },
  created() {
    this.getMenus();
  },
  methods: {
    ...mapActions(["getMenus", "addTab", "removeTab"])
  },
  watch: {
    /**
     * 路由发生变化的时候触发(刷新的情况)
     */
    routes() {
      // console.log("watch...");
      if (Object.keys(this.$route.params).length) {
        this.addTab(this.$route.params);
      }
    }
  },
  /**
   * 非第一次变动前触发
   */
  beforeRouteUpdate(to, from, next) {
    // console.log("beforeRouteUpdate...",to.params);
    this.addTab(to.params);
    next();
  },
  /**
   * 第一次点击菜单路由变动时触发
   */
  beforeRouteLeave(to, from, next) {
    // console.log("beforeRouteLeave...");
    if (Object.keys(to.params).length) {
      this.addTab(to.params);
    }
    next();
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
    // background-color: #e9eef3;
    background-color: #fff;
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
