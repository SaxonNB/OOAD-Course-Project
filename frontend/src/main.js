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
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueAMap);


Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '0f03cdb203bf95b394b62c37f8449bc4',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder','AMap.ElasticMarker']//一些需要用到的插件
})


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components:{
      App
  }
}).$mount('#app')
