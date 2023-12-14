// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import {adminLoginApi, userLoginApi} from '@/api/user';
import {ADMIN_USER_ID, ADMIN_USER_NAME, ADMIN_USER_TOKEN, USER_ID, USER_NAME, USER_TOKEN} from "@/store/constants";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        originalPage: null, // 用于存储用户登录前的页面路径
        user_id: undefined,
        user_name: undefined,
        user_token: undefined,

        admin_user_id: undefined,
        admin_user_name: undefined,
        admin_user_token: undefined,
        // 其他状态
    },
    mutations: {
        setOriginalPage(state, path) {
            state.originalPage = path;
        },
        // 其他 mutations
        // 用户登录 mutation
        userLogin(state, userData) {
            state.user_id = userData.id;
            state.user_name = userData.username;
            state.user_token = userData.token;
        },
        // 用户登出 mutation
        userLogout(state) {
            state.user_id = undefined;
            state.user_name = undefined;
            state.user_token = undefined;
        },
        // 管理员登录 mutation
        adminLogin(state, adminData) {
            state.admin_user_id = adminData.id;
            state.admin_user_name = adminData.username;
            state.admin_user_token = adminData.token;
        },
        // 管理员登出 mutation
        adminLogout(state) {
            state.admin_user_id = undefined;
            state.admin_user_name = undefined;
            state.admin_user_token = undefined;
        },
    },
    actions: {
        // 可以定义 actions
        // 用户登录 action
        async userLogin({ commit }, loginForm) {
            try {
                const result = await userLoginApi(loginForm);
                if (result.code === 200) {
                    commit('userLogin', result.data);
                    localStorage.setItem(USER_TOKEN, result.data.token);
                    localStorage.setItem(USER_NAME, result.data.username);
                    localStorage.setItem(USER_ID, result.data.id);
                }
                return result;
            } catch (error) {
                // 处理错误，可以打印错误信息或者返回特定的错误状态
                console.error('Error in userLogin action:', error);
                return { code: 500, message: 'Internal Server Error' };
            }
        },

        // 管理员登录 action
        async adminLogin({ commit }, loginForm) {
            try {
                const result = await adminLoginApi(loginForm);
                console.log('zzzzz')
                console.log(result)
                if (result.code === 200) {
                    commit('adminLogin', result.data);
                    localStorage.setItem(ADMIN_USER_TOKEN, result.data.token);
                    localStorage.setItem(ADMIN_USER_NAME, result.data.username);
                    localStorage.setItem(ADMIN_USER_ID, result.data.id);
                }
                return result;
            } catch (error) {
                // 处理错误，可以打印错误信息或者返回特定的错误状态
                console.error('Error in adminLogin action:', error);
                return { code: 500, message: 'Internal Server Error' };
            }
        },

    },
    getters: {
        // 可以定义 getters
    },
});
