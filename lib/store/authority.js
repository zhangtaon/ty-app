/**
 * app authority store module
 * author: zto
 */
export default {
    state: {
        debug: true,
        operate: null//每个菜单路由页面所具有的操作
    },
    mutations: {
        setOperate(state, operate) {
            state.operate = operate;
        }
    },
    actions: {
        /**
         * 设置页面的操作权限
         * @param {*} param0 
         * @param {*} operate 
         */
        setOperate({ commit, dispatch }, operate) {
            if(Object.prototype.toString.call(operate) == "[object String]"){
                //根据路由字符串获取对应的操作权限并进行设置
                dispatch("setOperateForString", operate);
            }else{
                //设置路由页面的操作权限
                commit("setOperate", operate);
            }
        },
        /**
         * 刷新时获取基于路由的操作权限
         * @param {*} param0 
         * @param {*} operate 
         */
        setOperateForString({ commit }, operate) {
            let _menus = JSON.parse(JSON.stringify(this.state.menu.menus));
            while (_menus.length) {
                let menu = _menus.shift();
                if (menu.children) {
                    _menus.push(...menu.children);
                } else {
                    if(operate.slice(1).startsWith(menu.router)){
                        commit("setOperate", menu.buttons);
                    }
                }
            }
        }
    }
}
