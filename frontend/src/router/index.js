import VueRouter from 'vue-router'
import Vue from "vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
import ManagePage from '../views/ManagePage.vue';
import UserInformation from '../components/manageComponents/UserInformation.vue';
import BuildingInformation from '../components/manageComponents/BuildingInformation.vue';
import CuisineProduct from '../components/manageComponents/CuisineProduct.vue';
import CuturalProduct from '../components/manageComponents/CuturalProduct.vue';
import BusRoute from '../components/manageComponents/BusRoute.vue';
import BusStation from '../components/manageComponents/BusStation.vue';
import UserComment from '../components/manageComponents/UserComment.vue';
import BuildingDetail from "@/components/mapComponents/BuildingDetail.vue";
import DataStatistics from "@/components/manageComponents/DataStatistics.vue";
import CanteenPage from "@/views/CanteenPage.vue";
import CanteenOrdersPage from "@/views/CanteenOrdersPage.vue";
import StorePage from "@/views/StorePage.vue";
import StoreOrdersPage from "@/views/StoreOrdersPage.vue";
import OrderManagement from "@/components/manageComponents/OrderManagement.vue";
Vue.use(VueRouter)

const routes = [
    {path: '/home', component: HomePage},
    {path: '/user/login', component: LoginPage},
    {path: '/user/register', component: RegisterPage},
    {path: '/', redirect: '/home'},
    {
        path: '/building/:id',
        name: 'buildingDetail',
        component: BuildingDetail,
        // 其他配置...
    },
    {
        path: '/manage',
        component: ManagePage,
        children: [
            { path: 'UserInformation', component: UserInformation },
            { path: 'BuildingInformation', component: BuildingInformation },
            { path: 'CuisineProduct', component: CuisineProduct },
            { path: 'CuturalProduct', component: CuturalProduct },
            { path: 'BusRoute', component: BusRoute },
            { path: 'BusStation', component: BusStation },
            { path: 'UserComment', component: UserComment },
            { path: 'DataStatistics', component: DataStatistics},
            { path: 'Orders', component: OrderManagement}
        ]
    },
    {
        path: "/restaurant-reservation",
        component: CanteenPage,
        beforeEnter: (to, from, next) => {
            // Assuming you have some authentication logic or a store to check if the user is logged in
            if (localStorage.getItem('user_token')) {
                // User is logged in, proceed to the restaurant reservation page
                next();
            } else {
                // User is not logged in, redirect to the login page
                next('/user/login'); // Adjust the path to your actual login page
            }
        },
    },
    {path:'/restaurant-reservation/record', component: CanteenOrdersPage},
    {
        path:'/creative-products',
        component: StorePage,
        beforeEnter: (to, from, next) => {
            // Assuming you have some authentication logic or a store to check if the user is logged in
            if (localStorage.getItem('user_token')) {
                // User is logged in, proceed to the restaurant reservation page
                next();
            } else {
                // User is not logged in, redirect to the login page
                next('/user/login'); // Adjust the path to your actual login page
            }
        },
    },
    {path:'/creative-products/record', component: StoreOrdersPage},

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
