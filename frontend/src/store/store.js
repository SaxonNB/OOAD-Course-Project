// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import { adminLoginApi, userLoginApi } from '@/api/user';
import { ADMIN_USER_ID, ADMIN_USER_NAME, ADMIN_USER_TOKEN, USER_ID, USER_NAME, USER_TOKEN } from "@/store/constants";

Vue.use(Vuex);

// 检查本地存储是否有用户信息
const checkLocalUser = () => {
    const userToken = localStorage.getItem(USER_TOKEN);
    const userName = localStorage.getItem(USER_NAME);
    const userId = localStorage.getItem(USER_ID);

    if (userToken && userName && userId) {
        return { token: userToken, name: userName, id: userId };
    }

    return null;
};
const checkLocalAdmin = () => {
    const userToken = localStorage.getItem(ADMIN_USER_TOKEN);
    const userName = localStorage.getItem(ADMIN_USER_NAME);
    const userId = localStorage.getItem(ADMIN_USER_ID);

    if (userToken && userName && userId) {
        return { token: userToken, name: userName, id: userId };
    }

    return null;
};
export default new Vuex.Store({
    state: {
        originalPage: null,
        user_id: undefined,
        user_name: undefined,
        user_token: undefined,

        admin_user_id: undefined,
        admin_user_name: undefined,
        admin_user_token: undefined,
    },
    mutations: {
        setOriginalPage(state, path) {
            state.originalPage = path;
        },
        userLogin(state, userData) {
            state.user_id = userData.id;
            state.user_name = userData.name;
            state.user_token = userData.token;
        },
        userLogout(state) {
            state.user_id = undefined;
            state.user_name = undefined;
            state.user_token = undefined;
        },
        adminLogin(state, adminData) {
            state.admin_user_id = adminData.id;
            state.admin_user_name = adminData.name;
            state.admin_user_token = adminData.token;
        },
        adminLogout(state) {
            state.admin_user_id = undefined;
            state.admin_user_name = undefined;
            state.admin_user_token = undefined;
        },
    },
    actions: {
        async userLogin({ commit }, loginForm) {
            try {
                const result = await userLoginApi(loginForm);
                if (result.status === 200) {
                    commit('userLogin', result.data);
                    localStorage.setItem(USER_TOKEN, result.data.token);
                    localStorage.setItem(USER_NAME, result.data.name);
                    localStorage.setItem(USER_ID, result.data.id);
                }
                return result;
            } catch (error) {
                console.error('Error in userLogin action:', error);
                return { code: 500, message: 'Internal Server Error' };
            }
        },
        userLogout({ commit }) {
            commit('userLogout');
            localStorage.removeItem(USER_TOKEN);
            localStorage.removeItem(USER_NAME);
            localStorage.removeItem(USER_ID);
        },
        adminLogout({ commit }) {
            commit('adminLogout');
            localStorage.removeItem(ADMIN_USER_TOKEN);
            localStorage.removeItem(ADMIN_USER_NAME);
            localStorage.removeItem(ADMIN_USER_ID);

        },
        async adminLogin({ commit }, loginForm) {
            try {
                const result = await adminLoginApi(loginForm);
                if (result.status === 200) {
                    commit('adminLogin', result.data);
                    localStorage.setItem(ADMIN_USER_TOKEN, result.data.token);
                    localStorage.setItem(ADMIN_USER_NAME, result.data.name);
                    localStorage.setItem(ADMIN_USER_ID, result.data.id);
                }
                return result;
            } catch (error) {
                console.error('Error in adminLogin action:', error);
                return { code: 500, message: 'Internal Server Error' };
            }
        },
    },
    getters: {},
    // 在创建实例时检查本地存储
    plugins: [store => {
        const localUser = checkLocalUser();
        if (localUser) {
            store.commit('userLogin', localUser);
        }
        const localAdmin = checkLocalAdmin();
        if (localAdmin) {
            store.commit('adminLogin',localAdmin)
        }
    }],
});
