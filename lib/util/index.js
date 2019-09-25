/**
 * author: zto
 * 动态菜单路由解析
 */
// import axios from "axios";
// import App from '../../app/App.vue'
// import component from './route'

//授权路由
const grantedRoutes = [];
const grantedRoute = {};
let component;
let router;

/**
 * 获取渲染路由
 * @param {*} route 
 */
let getRenterRoute = function (route) {
    let keys = Object.keys(component);

    if (!router) {
        return;
    }
    //反向操作数组，减少空间复杂度及时间复杂度
    for (let i = keys.length - 1; i >= 0; i--) {
        // console.log(`key:${keys[i]} index:${i} route:${route}`);

        //如果业务模块路由能够索引到请求回来的路由就加入初始化队列
        if (keys[i].startsWith(route)) {
            grantedRoutes.push(component[keys[i]]);
            grantedRoute[keys[i]] = component[keys[i]];
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

export function initAppComponent(component) {
    component = component;
    router = "router"
}

/**
 * 获取app后台菜单对应的路由
 * 已废弃
 */
// export async function getAppRoute() {
//     const appRoute = {
//         path: '/app',
//         component: App
//     };
//     try {
//         const data = await axios.get("/menus");
//         appRoute.children = parseMenu(data);
//         return appRoute;
//     } catch {
//         return appRoute;
//     }
// }




