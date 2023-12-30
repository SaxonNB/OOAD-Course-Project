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
import BuildingStatus from "@/components/welcomeComponents/BuildingStatus.vue";
import RestaurantReservation from "@/components/welcomeComponents/RestaurantReservation.vue";
import CommentAreas from "@/components/welcomeComponents/CommentAreas.vue";
import ShoppingList from "@/components/welcomeComponents/ShoppingList.vue";
import CreativeProduct from "@/components/welcomeComponents/CreativeProduct.vue";
import CreativeList from "@/components/welcomeComponents/CreativeList.vue";
import BuildingDetail from "@/components/mapComponents/BuildingDetail.vue";
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
            {
                path: '',
                redirect: 'UserInformation'
            },
            { path: 'UserInformation', component: UserInformation },
            { path: 'BuildingInformation', component: BuildingInformation },
            { path: 'CuisineProduct', component: CuisineProduct },
            { path: 'CuturalProduct', component: CuturalProduct },
            { path: 'BusRoute', component: BusRoute },
            { path: 'BusStation', component: BusStation },
            { path: 'UserComment', component: UserComment },
        ]
    },
    {path: '/building', component: BuildingStatus},
    {path: '/comments', component: CommentAreas},
    {path:'/restaurant-reservation',component: RestaurantReservation},
    {path:'/restaurant-reservation/shoppingList', component: ShoppingList},
    {path:'/creative-products',component: CreativeProduct},
    {path:'/creative-products/creative-list', component: CreativeList},

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
