import Vue from 'vue'
import App from './App.vue'
import VueAMap from 'vue-amap';

import Vuex from "vuex";
import VueRouter from "vue-router";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios"
import store from "@/store/store";
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueAMap);



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components:{
    App
  }
}).$mount('#app')
