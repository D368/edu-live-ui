<template>
  <div class="login">
    <div>
      <el-input placeholder="请输入邮箱/手机号" v-model="username" clearable class="input_style"></el-input>
      <span v-if="error.username" class="err-msg">{{error.username}}</span>
    </div>
    <div>
      <el-input placeholder="请输入密码" v-model="password" show-password class="input_style"></el-input>
      <span v-if="error.password" class="err-msg">{{error.password}}</span>
    </div>
    <div>
      <el-button type="primary" @click="login" class="login_style">登录</el-button>
    </div>
  </div>
</template>

<script>
import auth from '@/api/auth/auth'
import md5 from 'js-md5'
  export default {
    name: "Login",
    data(){
      return {
        username: '',
        password : '',
        error : {
          username: '',
          password : ''
        }
      }
    },
    methods:{
      login(){
        // const { name, pwd, $router} = this
      var params = {username:this.username,password:md5(this.password)}
       auth.login(params).then(res=>{
          localStorage.setItem('loginInfo',JSON.stringify(res.data));
          localStorage.setItem('token',res.data.token);
          this.$router.push({
          name: "main",
          params: {
            username: this.name
          }
        });
       }).catch(error=> {console.log(error)})
       


      //  this.$http({
      //       url:'/auth/login',
      //       method:'post'
      //   }).then(res => {
      //     if(res.code == 200 ){
      //         console.log(res);
      //     }else{
      //       this.$message({
      //         message:'error',
      //         type:'error'
      //       })
      //     }
      //   })
        // this.$router.push({
        //   name: "main",
        //   params: {
        //     username: this.name
        //   }
        // });
      }
    }
  }
</script>

<style>
  .login{
    margin-top: 200px;
  }
  .input_style{
    width: 200px;
    margin-bottom: 10px;
  }
  .login_style{
    width: 200px;
  }
</style>

