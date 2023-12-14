<template>
  <body id="poster">
  <el-form class="login-container" label-position="left">
    <h3 class="login_tittle">登录</h3>
    <el-form-item label="账号">
      <el-input type="text" v-model="loginForm.name" autocomplete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width:40%;background: #2c3e50;border:none" @click="handleLogin()">登录</el-button>
      <el-button type="primary" style="width:40%;background: #2c3e50;border: none" @click="handleRegister()" :disabled="isAdmin">注册
      </el-button>
    </el-form-item>
    <el-form-item style="width: 100%; text-align: center; margin-top: 20px;">
      <el-switch v-model="isAdmin" active-text="管理员" inactive-text="用户"></el-switch>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      isAdmin: false
    }
  },
  created() {
    // Ensure Vuex is installed
    if (!this.$store) {
      throw new Error('Vuex is not installed. Make sure to call Vue.use(Vuex).');
    }
  },
  methods: {
    async handleLogin() {
      // const userStore = useUserStore();
      // console.log(this.loginForm)
      if (this.isAdmin) {
        const result = await this.$store.dispatch('adminLogin',this.loginForm);
        console.log(result)
        if (result.code === 200){
          this.$message({
            message: '登陆成功!',
            type: "success"
          });
          await this.$router.push('/manage')
        }else {
          console.log(result)
          console.log('qqqqqq')
        }
      }else {
        const result = await this.$store.dispatch('userLogin',this.loginForm);
        if (result.code === 200){
          this.$message({
            message: '登陆成功!',
            type: "success"
          });
          await this.$router.push('/home')
        }else {
          console.log(result)
          console.log('qqqqqq')
        }
      }
    },
    handleRegister() {
      this.$router.push({path: '/user/register'})
    }
  }
}
</script>

<style scoped>
#poster {
  background-image: url('@/assets/loginBackground.jpg');
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 500px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid;
  box-shadow: 0 0 25px;
  opacity: 0.9;
}

.login_tittle {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>