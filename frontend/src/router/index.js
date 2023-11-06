import VueRouter from 'vue-router'
import Vue from "vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
Vue.use(VueRouter)

const routes = [
    {path: '/home', component: HomePage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/', redirect: '/login'}
]

export default new VueRouter({
    mode: 'history',
    routes
})
