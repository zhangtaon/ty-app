/**
 * login store module
 * author: zto
 */
import axios from "axios";
import { gatewayHttp, setHeader } from "ty-build/lib/config"

export default {
    state: {
        debug: true,
        userInfo: null,
        token: null
    },
    mutations: {
        setUser(state, data) {
            state.userInfo = data;
        },
        setToken(state, data) {
            state.token = data;
        }
    },
    actions: {
        async login({ commit, dispatch }, frm) {
            try {
                const data = await gatewayHttp.post("/open/auth/authorize", frm);
                setHeader({ "Authorization": `Bearer ${data.token}` });
                commit("setToken", data);
                //缓存授权token
                sessionStorage.setItem("Authorization", `Bearer ${data.token}`);
                sessionStorage.setItem("expireTime", data.expireTime);
                //注册路由（包括大屏静态路由和管理后台动态路由）
                dispatch("registryRoute", "/app");
                //获取用户信息
                dispatch("profile");
            } catch { }
        },
        async profile({ commit }) {
            try {
                const data = await gatewayHttp.get("/open/auth/profile");
                commit("setUser", data);
            } catch { }
        },
        /**
         * 刷新token
         * @param {*} param0 
         */
        async refreshToken({ commit, state, dispatch }) {
            let expireTime = sessionStorage.getItem("expireTime");
            if (!expireTime) {
                return;
            }
            let now = (new Date).getTime();
            let dValue = Number(expireTime) - now;
            //15分钟之内就进行刷新token 15*60*1000 = 900000  15秒：15000
            if (dValue > 0 && dValue < 900000) {
                try {
                    const data = await gatewayHttp.post("/open/auth/refresh");
                    commit("setUser", data);
                } catch { }
            }
            else if (dValue > 0) {
                console.log("token:", (dValue / 1000) + "秒后过期");
            } else {
                dispatch("clearToken");//token已过期
            }
        },
        //占位符 还未安排
        async registry({ commit, state }, data) {
            try {
                const data = await axios.get("/registry", {
                    params: data
                });
                commit("setUser", data);
            } catch { }
        },
        //退出登录
        async logout({ dispatch }) {
            try {
                await gatewayHttp.post("/open/auth/destroy");
                dispatch("clearToken");
            } catch { }
        },
        clearToken() {
            sessionStorage.removeItem("Authorization");
            setHeader({ "Authorization": "" });
            location.reload();
        }
    }
}
