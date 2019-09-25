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
            <component :is="item.component"></component>
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
      routes: state => state.menu.routes
    })
  },
  data: function() {
    return {
      tabs: [],
      activeTabIndex: 0,
      tabIndex: 0
    };
  },
  components: {
    TyMenuTree
  },
  created() {
    this.getMenus();
  },
  methods: {
    ...mapActions(["getMenus", "getRouterComponony"]),
    /**
     * 添加tab组件
     */
    async addTab(params) {
      const tab = await this.getRouterComponony({
        params: params,
        tabIndex: this.tabIndex++
      });
      let _tab;
      for (let i = 0; i < this.tabs.length; i++) {
        if (tab.title == this.tabs[i].title) {
          _tab = this.tabs[i];
          break;
        }
      }
      if (!_tab) {
        this.tabs.push(tab);
      }
      this.activeTabIndex = _tab ? _tab.tabIndex : tab.tabIndex;
    },
    /**
     * 删除tab组件
     */
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.activeTabIndex;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.tabIndex === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.tabIndex;
            }
          }
        });
      }
      this.activeTabIndex = activeName;
      this.tabs = tabs.filter(tab => tab.tabIndex !== targetName);
    }
  },
  watch: {
    routes() {
      if (Object.keys(this.$route.params).length) {
        this.addTab(this.$route.params);
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.addTab(to.params);
    next();
  },
  beforeRouteLeave(to, from, next) {
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
