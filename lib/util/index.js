/**
 * author: zto
 * 动态菜单路由解析
 */
import App from '../App.vue'

//授权路由
const grantedRoutes = [];
const grantedRoute = {};
let _component;
let router = "router";

/**
 * 获取渲染路由
 * @param {*} route 
 */
let getRenterRoute = function (route) {
    let keys = Object.keys(_component);

    if (!router) {
        return;
    }
    //反向操作数组，减少空间复杂度及时间复杂度
    for (let i = keys.length - 1; i >= 0; i--) {
        // console.log(`key:${keys[i]} index:${i} route:${route}`);

        //如果业务模块路由能够索引到请求回来的路由就加入初始化队列
        if (keys[i].startsWith(route)) {
            grantedRoutes.push(_component[keys[i]]);
            grantedRoute[keys[i]] = _component[keys[i]];
            keys.splice(i, 1);
        }
    }
}
/**
 * 解析菜单(采用广度优先算法遍历菜单树)
 * @param {*} menus 
 */
export function parseMenu(menus) {
    if (!menus.length) {
        return;
    }
    let _menus = JSON.parse(JSON.stringify(menus));
    while (_menus.length) {
        let menu = _menus.shift();
        if (menu.children) {
            _menus.push(...menu.children);
        } else {
            getRenterRoute(menu[router]);
        }
    }
    return { grantedRoutes, grantedRoute };
}

/**
 * 获取app后台菜单对应的路由
 */
export default function getAppRoute(menus, dynamicRoute) {
    _component = dynamicRoute;

    const appRoute = {
        path: '/app',
        component: App
    };
    let routes = parseMenu(menus);
    appRoute.children = routes.grantedRoutes;
    return appRoute;
}

