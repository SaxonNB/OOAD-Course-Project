import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Register from "@/views/Register";

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/', redirect: '/login'}
]

export default new VueRouter({
    mode: 'history',
    routes
})
