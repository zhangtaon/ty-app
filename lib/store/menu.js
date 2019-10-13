/**
 * video store module
 * author: zto
 */
import axios from "axios";
import getAppRoute from "../util"
import route404 from "../route"

export default {
    state: {
        debug: true,
        menus: null //控制浮层弹框的显示、定时器的设置和取消。每个视频播放器的组件id
    },
    mutations: {
        setMenus(state, list) {
            state.menus = list;
        }
    },
    actions: {
        async getMenus({ commit }) {
            try {
                const data = await axios.get("/menus", {
                    params: {
                        userName: ""
                    }
                });
                commit("setMenus", data);
            } catch { }
        },
        /**
         * 登录成功注册路由
         * @param {*} param0 
         * @param {*} context {app:单页面实例（Vue）, staticRoute：静态路由（Array）, dynamicRoute：动态路由（Array）, toPath：跳转路径（String）} 
         */
        async registryRoute({ state, dispatch }, context) {
            let $router = context.app.$router;
            let staticRoute = context.staticRoute || [];
            let dynamicRoute;
            //初始化菜单
            await dispatch("getMenus");
            //解析动态路由（依据菜单信息，生成有效路由）
            dynamicRoute = context.dynamicRoute ? [getAppRoute(state.menus, context.dynamicRoute)] : [];
            //添加路由
            $router.addRoutes([...staticRoute, ...dynamicRoute, ...route404]);
            if (context.toPath) {
                $router.push(context.toPath);
            }
        }
    }
}
