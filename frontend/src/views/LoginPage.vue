<template>
  <body id="poster">
    <el-form class="login-container" label-position="left">
      <h3 class="login_tittle">登录</h3>
      <el-form-item label="账号">
        <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width:40%;background: #2c3e50;border:none" @click="login()">登录</el-button>
        <el-button type="primary" style="width: 40%;background: #2c3e50;border: none" @click="toRegister()">注册</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
  export default {
    name:'LoginPage',
    data(){
      return{
        loginForm:{
          account:'',
          password:''
        }
      }
    },
    methods:{
      login() {
        // console.log(this.loginForm)
        this.axios.post('http://localhost:8088/login',this.loginForm).then((resp) =>{
          let data = resp.data
          if (data.success){
            this.loginForm = {};
            this.$message({
              message: '登陆成功!',
              type: "success"
            });
            this.$router.push({path:'/home'})
          }
        })

      },
      toRegister(){
        this.$router.push({path:'/register'})
      }
    }
  }
</script>

<style>
  #poster{
    background-image: url('../assets/loginBackground.jpg');
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
    padding: 0;
  }
  .login-container{
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
  .login_tittle{
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>