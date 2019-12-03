<template>
  <el-container class="app cz">
    <el-header height="72px">
      <el-popover
        popper-class="menuPop"
        ref="menuPop"
        placement="bottom-start"
        width="262"
        trigger="hover"
        v-model="menuPop"
      >
        <div class="menu" v-for="(item,index) in menus" @click="setSecondMenu(item)" :class="{active: secondMenu.id == item.id}">
          <span
            class="iconfont"
            :class="{'iconzonghexinxichaxun': item.id==1000000,'iconzhishiku': item.id==2000000,'iconpeizhizhongxin': item.id==3000000,'iconkeshihuaGISjiankong': item.id==4000000,'iconshipinjiankong': item.id==5000000,'iconzongheanquanshitaifenxi': item.id==6000000,'iconguochenganquanguanli': item.id==7000000,'iconyingjiguanli': item.id==8000000,'iconchengbaoshangguanli': item.id==1900,'iconbaojingguanli': item.id==9000000}"
          ></span>
          {{item.name}}
        </div>
      </el-popover>
      <el-popover
        popper-class="settingPop"
        ref="settingPop"
        placement="bottom-end"
        width="126"
        trigger="hover"
        v-model="settingPop"
      >
        <div class="item">
          <div class="username">{{userInfo.nickName}}</div>
        </div>
        <!-- <div class="item">
          <span class="iconfont iconyonghushezhi2"></span>
          用户设置
        </div>
        <div class="item">
          <span class="iconfont iconxiugaimima"></span>
          修改密码
        </div> -->
        <div class="item exit" @click="logout()">
          <span class="iconfont icontuichu1"></span>
          退出
        </div>
      </el-popover>
      <div class="box-between-center">
        <div class="box-between-center logo">
          <img src="./image/logo-header.png" alt />
          <span>{{systemName}}</span>
        </div>
        <div class="operate">
          <!-- <span v-if="isCz" class="item">
            <router-link to="/gis">
              <img src="./image/home.png" alt />
            </router-link>
          </span> -->
          <span v-if="isCz" class="item" @click="to('/gis')" @mouseover="mouseOver('gis')" @mouseleave="mouseLeave" :class="{'active': active=='gis'}">
              <span class="iconfont iconkeshihuaGISjiankong"></span>
              <span class="tip">可视化GIS监控</span>
          </span>
          <span v-if="isCz" class="item" @click="to('/video')" @mouseover="mouseOver('video')" @mouseleave="mouseLeave" :class="{'active': active=='video'}">
              <span class="iconfont iconshipinjiankong"></span>
              <span class="tip">视频监控</span>
          </span>
          <span v-if="isCz" v-popover:menuPop class="item" :class="{'active': menuPop}">
            <span class="iconfont iconcaidan"></span>
          </span>
<!-- 报警暂时注销
          <span v-if="isCz" class="item">
            <img src="./image/alarm.png" alt />
          </span>
           
          <span v-if="isCz" class="item">
            <img src="./image/info.png" alt />
          </span>
          -->
          <span class="item" v-popover:settingPop :class="{'active': settingPop}">
            <!-- <img src="./image/crm.png" alt /> -->
            <span class="iconfont iconyonghushezhi"></span>
          </span>
        </div>
      </div>
      <!-- <el-button type="primary" @click="logout()">退出</el-button> -->
    </el-header>
    <el-container>
      <el-aside width="256px">
        <ty-menu-tree :menus="secondMenu.children"></ty-menu-tree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TyMenuTree from "./component/menu/tyMenuTree.vue";
import { mapState, mapActions , mapMutations} from "vuex";
import "./style/cz/index.scss";

export default {
  name: "App",
  computed: {
    ...mapState({
      menus: state => state.menu.menus,
      secondMenu: state => state.menu.secondMenu,
      userInfo: state => state.login.userInfo,
    }),
    isCz: {
      get: function() {
        return this.system === "gis-cangzhou";
      }
    }
  },
  created(){
  },
  data() {
    return {
      systemName: require("../../../package.json").description,
      system: require("../../../package.json").name,
      menuPop: false,
      settingPop: false,
      active: ""
    };
  },
  components: {
    TyMenuTree
  },
  methods: {
    ...mapActions(["logout"]),
    ...mapMutations(["setSecondMenu"]),
    to(url){
      window.open(this.$router.resolve({ path: url }).href, "_blank");
    },
    mouseOver(name){
      this.active = name;
    },
    mouseLeave(){
      this.active = "";
    },
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
//解决获取焦点蓝色边框
:focus {
  outline: none;
}
</style>