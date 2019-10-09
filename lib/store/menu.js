/**
 * video store module
 * author: zto
 */
import axios from "axios";

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
        }
    }
}
