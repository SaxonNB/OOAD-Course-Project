import VueRouter from 'vue-router'
import Vue from "vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
Vue.use(VueRouter)

const routes = [
    {path: '/home', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/user/register', component: RegisterPage},
    {path: '/', redirect: '/home'}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.path ==='/user/login') {
//         // 记录用户登录前的页面，除非从注册页面跳转到登录页面
//         // 使用 this.$store 来访问 store
//         this.$store.commit('setOriginalPage', from.path);
//     }
//     next();
// });


export default router;
