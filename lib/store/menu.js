/**
 * video store module
 * author: zto
 */
import axios from "axios";
import { parseMenu } from "../util"
import { Page404 } from "ty-componeny"

export default {
    state: {
        debug: true,
        menus: null, //控制浮层弹框的显示、定时器的设置和取消。每个视频播放器的组件id
        routes: null
    },
    mutations: {
        setMenus(state, list) {
            state.menus = list;
        },
        setRoutes(state, routes) {
            state.routes = routes;
        }
    },
    actions: {
        async getMenus({ commit, state }) {
            try {
                const data = await axios.get("/menus", {
                    params: {
                        userName: ""
                    }
                });
                commit("setMenus", data);
                commit("setRoutes", parseMenu(data));
            } catch { }
        },
        getRouterComponony({ commit, state }, op) {
            // let moduleName = op.params.module1 + (op.params.module2 ? "_" + op.params.module2 : "");
            let moduleName = "";
            for (let key in op.params) {
                moduleName += "_" + op.params[key];
            }
            moduleName = moduleName.replace("_", "");
            console.log("moduleName:", moduleName);
            const module = state.routes.grantedRoute[moduleName];
            const tabIndex = '' + op.tabIndex;

            return module ? { ...module, tabIndex } : {
                tabIndex,
                title: "404",
                component: Page404
            };
        }
    }
}
