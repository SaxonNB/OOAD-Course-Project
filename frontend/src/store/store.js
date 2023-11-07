// store.js
import Vuex from "vuex";
export default new Vuex.Store({
    state: {
        originalPage: null, // 用于存储用户登录前的页面路径
        // 其他状态
    },
    mutations: {
        setOriginalPage(state, path) {
            state.originalPage = path;
        },
        // 其他 mutations
    },
    actions: {
        // 可以定义 actions
    },
    getters: {
        // 可以定义 getters
    },
});
