<template>
  <div id="poster">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="register-container" label-position="left">
      <h3 class="register_tittle">注册</h3>
      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="registerForm.account" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width:40%;background: #2c3e50;border:none" @click="submitForm('registerForm')">注册</el-button>
        <el-button type="primary" style="width:40%;background: #2c3e50;border:none" @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      setTimeout(() => {
        // console.log('len is'+value.length)
        if (value.length !== 8) {
          callback(new Error('账号必须是8位'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        // console.log('m密码比较')
        // console.log(value)
        // console.log(this.ruleForm.password)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        account: '',
        password: '',
        checkPass: ''
      },
      rules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('http://localhost:8088/register',this.rForm).then((resp) =>{
            let data = resp.data
            if (data.success){
              this.loginForm = {};
              this.$message({
                message: '注册成功!',
                type: "success"
              });
              this.$router.push({path:'/home'})
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    margin: 0;
    padding: 0;
  }
  .register-container{
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
  .register_tittle{
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>