<template>
  <div>
    <div>
      <MyHeader />
    </div>
    <div class="header">
      <h1>南方科技大学校园开放平台</h1>
    </div>

    <div class="navbar">
      <router-link to="/restaurant-reservation">餐饮预订</router-link>
      <router-link to="/creative-products">文创产品预订</router-link>
    </div>

    <div class="map">
      <SustechMap></SustechMap>
    </div>
    <div class="footer">
      <MyFooter></MyFooter>
    </div>
  </div>
</template>

<script>
import SustechMap from "@/components/mapComponents/SustechMap.vue";
import MyFooter from "@/components/welcomeComponents/MyFooter.vue";
import MyHeader from "@/components/welcomeComponents/MyHeader.vue";
export default {
  name: "HomePage",
  components: {
    MyHeader,
    MyFooter,
    SustechMap,
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  padding: 20px;
}

button {
  margin: 10px;
}

.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.navbar a {
  text-decoration: none;
  color: #fff;
}

.map {
}
</style>
