/**
 * app menu store module
 * author: zto
 */
import { authHttp } from "@ty-build/lib/config"
import getAppRoute from "../util"
import { route404 } from "../route"
export default {
    state: {
        debug: true,
        menus: null,
        secondMenu: []
    },
    mutations: {
        setMenus(state, list) {
            state.menus = list;
        },
        setSecondMenu(state, data) {
            state.secondMenu = data;
        },
    },
    actions: {
        async getMenus({ state, commit }) {
            try {
                const data = await authHttp.get("/user/menus", {
                    params: {
                        type: 2
                    }
                });
                commit("setMenus", data);
            } catch { }
        },
        /**
         * 登录成功注册路由
         * @param {*} param0 
         * @param {String} toPath：要跳转的页面路由地址} 
         */
        async registryRoute({ state, dispatch }, toPath) {
            //获取项目上下文属性对象
            let context = this.state.context;
            //获取路由实例
            let $router = context.app.$router;
            //获取静态路由
            let staticRoute = context.staticRoute || [];
            //定义动态路由
            let dynamicRoute;
            //初始化菜单
            await dispatch("getMenus");
            //解析动态路由（依据菜单信息，生成有效路由）
            dynamicRoute = context.dynamicRoute ? [getAppRoute(state.menus, context.dynamicRoute)] : [];
            //添加路由
            $router.addRoutes([...staticRoute, ...dynamicRoute, ...route404]);
            if (toPath) {
                //设置页面具有的操作权限
                dispatch("setOperate", toPath);
                //跳转目标路由
                $router.push(toPath);
            }
        },
    }
}
