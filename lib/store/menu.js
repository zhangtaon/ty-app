/**
 * video store module
 * author: zto
 */
import axios from "axios";
import { parseMenu } from "../util"
import { Page404 } from "ty-componeny"

let tabIndex = 0;
export default {
    state: {
        debug: true,
        menus: null, //控制浮层弹框的显示、定时器的设置和取消。每个视频播放器的组件id
        routes: null,
        tabs: [],
        activeTabIndex: 0
    },
    mutations: {
        setMenus(state, list) {
            state.menus = list;
        },
        setRoutes(state, routes) {
            state.routes = routes;
        },
        setActiveTabIndex(state, tabIndex) {
            state.activeTabIndex = tabIndex;
        },
        setTabs(state, tabs) {
            state.tabs = tabs;
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
                commit("setRoutes", parseMenu(data));
            } catch { }
        },
        _getRouterComponony({ state }, op) {
            //解析参数
            let params = [];
            let _params = [];
            for (let key in op.params) {
                params.push(op.params[key]);
            }

            //解析路由配置对象路径中的参数 并封装到module和_params
            let parseModuleParams = function (module, route, params) {
                module.params = {};
                for (let i = 0; i < route.length; i++) {
                    if (route[i][0] == ":") {
                        //将参数封装到路由对象中
                        module.params[route[i].slice(1)] = params[i];
                        //将参数封装到内部变量数组中
                        _params.push(params[i]);
                    }
                }
            };
            //遍历有效路由数组，找出目标路由配置对象
            let module;
            for (let i = 0; i < state.routes.grantedRoutes.length; i++) {
                /**
                 * 解析出参数数组
                 * path: /account/:d/:c result：["account", ":d", ":c"]
                 */
                let route = state.routes.grantedRoutes[i].path.split("/").slice(1);
                /**
                 * 根据第一个参数是否相同，和数量来匹配对应的路由
                 * error
                 * route :["account", ":d", ":c"]
                 * params:["account", "HWO010"]
                 * 
                 * success
                 * route: ["account", ":id"]
                 * params:["account", "HWO010"]
                 */
                if (params[0] === route[0] && params.length == route.length) {
                    module = state.routes.grantedRoutes[i];
                    parseModuleParams(module, route, params);
                    break;
                }
            }
            //选项卡索引字符串化
            const tabIndex = '' + op.tabIndex;

            if (module) {
                module = { ...module }
                //将第一个参数追加到title
                module.title += _params[_params.length - 1] || '';
            }
            return module ? { ...module, tabIndex } : {
                tabIndex,
                title: "404",
                component: Page404
            };
        },
        async addTab({ state, commit, dispatch }, params) {
            const tab = await dispatch("_getRouterComponony", {
                params: params,
                tabIndex: tabIndex++
            })
            let _tab;
            /**
             * 遍历已经生成的tab列表，如果要添加的tab已经生成，变量_tab赋值并退出循环
             */
            for (let i = 0; i < state.tabs.length; i++) {
                if (tab.title == state.tabs[i].title) {
                    _tab = state.tabs[i];
                    break;
                }
            }
            /**
             * 如果没有生成，则生成新的tab
             */
            if (!_tab) {
                state.tabs.push(tab);
            }
            /**
             * 设定当前tab索引
             */
            commit("setActiveTabIndex", _tab ? _tab.tabIndex : tab.tabIndex);
        },
        /**
         * 删除tab组件
         */
        removeTab({ state, commit }, targetName) {
            let tabs = state.tabs;
            let activeName = state.activeTabIndex;
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
            commit("setActiveTabIndex", activeName);
            commit("setTabs", tabs.filter(tab => tab.tabIndex !== targetName));
        }
    }
}
