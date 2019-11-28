<template>
  <div>
    <template v-for="(item,index) in menus">
      <el-submenu v-if="item.children" :key="index" :index="item.name">
        <template slot="title">
          <ty-menu-icon :name="item.name"></ty-menu-icon>
          <span>{{item.name}}</span>
        </template>
        <ty-menu-item :menus="item.children"></ty-menu-item>
      </el-submenu>
      <el-menu-item v-if="!item.children" :key="index" :index="item.name" @click="goto(item)">
        <ty-menu-icon :name="item.name"></ty-menu-icon>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import TyMenuIcon from "./tyMenuIcon.vue";
import { mapActions } from "vuex";

export default {
  name: "TyMenuItem",
  components: {
    TyMenuIcon
  },
  props: {
    menus: Array
  },
  methods: {
    ...mapActions(["setOperate"]),
    goto: function(item) {
      //设置路由页面的具备的操作权限
      this.setOperate(item.buttons);
      this.$router.push(`/${item.router}` || "/enterprise");
    }
  }
};
</script>
