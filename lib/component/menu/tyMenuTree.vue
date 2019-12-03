<template>
  <el-menu
    :default-active="activeKey"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <ty-menu-item :menus="$store.state.menu.secondMenu.children"></ty-menu-item>
          <!-- <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title" @click="goto('monitor')">实时监控</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="goto('account')">账号管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title" @click="goto('enterprise')">企业信息</span>
          </el-menu-item> -->
  </el-menu>
</template>

<script>
import TyMenuItem from "./tyMenuItem.vue";
import { mapState, mapActions} from "vuex";

export default {
  name: "TyMenuTree",
  components: {
    TyMenuItem
  },
  data(){
    return{
      routeUrl:""
    }
  },
  computed:{
    ...mapState({
      secondMenu: state => state.menu.secondMenu
    }),
    activeKey: {
      get(){
        return this.$route.path.split('/')[1];
      },
      set(val){
        this.routeUrl = val;
      }
    }
  },
  created(){
    console.log("$store.state.menu.secondMenu.children:",this.$store.state.menu.secondMenu.children);
  },
  watch:{
    activeKey(newval){
      console.log("activeKey newval:",newval);
    },
    secondMenu(newVal){
      let findFirstRoute = (item)=>{
        if(item.children){
          findFirstRoute(item.children[0]);
        }else{
          this.activeKey = item.router;
        }
      }
      findFirstRoute(newVal);
      this.$router.push(`/${this.routeUrl}`);

    }
  },
  methods: {
    handleOpen: function(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose: function(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>