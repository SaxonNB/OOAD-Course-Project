<!-- components/MyHeader.vue -->
<template>
  <div class="my-header">
    <div class="logo">
      <img src="../../assets/SustechLogo.png" alt="Logo">
    </div>
    <div class="user-info" v-if="userStore.user_token">
      <!-- 用户已登录 -->
      <div>{{ userStore.user_name }}</div>
      <button @click="logout">退出</button>
    </div>
    <div class="login-button" v-else>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userStore() {
      return this.$store.state;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('userLogout');
    },
    login(){
      this.$router.push("/user/login");
    }
  },
};
</script>

<style scoped>
.my-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 56px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #cedce4;
  padding-left: 48px;
  padding-right: 48px; /* 在右侧添加一些内边距 */
  z-index: 16;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  margin-right: auto; /* 将 Logo 推到左侧 */
}

.user-info {
  display: flex;
  align-items: center;

  div {
    margin-right: 80px;
  }

  button {
    margin-right: 50px; /* 将退出按钮推到最右侧 */
  }
}

.login-button {
  margin-right: 50px; /* 将登录按钮推到最右侧 */
}
</style>
