import VueRouter from 'vue-router'
import Vue from "vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
import ManagePage from '../views/ManagePage.vue';
import UserInformation from '../components/manageComponents/UserInformation.vue';
import BuildingInformation from '../components/manageComponents/BuildingInformation.vue';
import ProjectStatus from '../components/manageComponents/ProjectStatus.vue';
Vue.use(VueRouter)

const routes = [
    { path: '/home', component: HomePage },
    { path: '/user/login', component: LoginPage },
    { path: '/user/register', component: RegisterPage },
    { path: '/', redirect: '/home' },
    {
        path: '/manage',
        component: ManagePage,
        children: [
            {
                path: '',
                redirect: 'UserInformation'
            },
            { path: 'UserInformation', component: UserInformation },
            { path: 'BuildingInformation', component: BuildingInformation },
            { path: 'ProjectStatus', component: ProjectStatus },
        ]
    }
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
