<!-- components/MyHeader.vue -->
<template>
  <div class="my-header">
    <div class="logo">
      <img src="../../assets/SustechLogo.png" alt="Logo">
    </div>

    <div v-if="userStore.user_token">
      <!-- 用户已登录 -->
      <div>{{ userStore.user_name }}</div>
      <button @click="logout">退出</button>
    </div>
    <div v-else>
      <!-- 用户未登录 -->
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
    login() {
      this.$store.dispatch('userLogin', { /* loginForm 数据 */ });
    },
    logout() {
      this.$store.dispatch('userLogout');
    },
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
  z-index: 16;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo {
  margin-right: 24px;

  img {
    max-width: 100%; /* 设置最大宽度为父元素的100% */
    max-height: 100%; /* 设置最大高度为父元素的100% */
    cursor: pointer;
  }
}
</style>
