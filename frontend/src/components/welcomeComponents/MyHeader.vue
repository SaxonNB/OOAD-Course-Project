<!-- components/MyHeader.vue -->
<template>
  <div class="my-header">
    <div class="logo">
      <img src="../../assets/SustechLogo.png" alt="Logo">
    </div>
    <div class="user-info" v-if="userStore.user_token">
      <!-- 用户已登录 -->
      <div>{{ userStore.user_name }}</div>
      <button class="send-btn" @click="logout">退出</button>
    </div>
    <div class="login-button" v-else>
      <button class="send-btn" @click="login">登录</button>
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
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name')
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
  .logo {
    margin-right: auto; /* 将 Logo 推到左侧 */
  }
  .send-btn {
    margin-left: 10px;
    background: #4684e2;
    border-radius: 4px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 80px;
    flex: 0 0 80px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    height: 32px;
    line-height: 32px;
    outline: none;
    border: 0px;
    cursor: pointer;
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
}


</style>
