<template>
  <div>
    <div class="header">
      <h1>欢迎来到我的主页</h1>
      <button @click="userLogin">用户登录</button>
      <button @click="adminLogin">管理员登录</button>
    </div>

    <div class="navbar">
      <router-link to="/bus-route">公交路线查询</router-link>
      <router-link to="/restaurant-reservation">餐饮预订</router-link>
      <router-link to="/creative-products">文创产品预订</router-link>
    </div>

    <div class="map">
      <SustechMap></SustechMap>
    </div>
  </div>
</template>

<script>
import SustechMap from "@/components/mapComponents/SustechMap.vue";
export default {
  name: "HomePage",
  components: {SustechMap},
  methods: {
    userLogin() {
      // 用户登录逻辑，可以跳转到用户登录页面
      this.$router.push("/user/login");
    },
    adminLogin() {
      // 管理员登录逻辑，可以跳转到管理员登录页面
      this.$router.push("/admin/login");
    }
  }
}
</script>

<style>
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
