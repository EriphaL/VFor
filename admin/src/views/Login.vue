<template>
  <div class="login-container">
<el-card header="请先登录" class="login-card">
  <!-- //监听表单submit，native表示原生事件，prevent表示阻止表单的默认提交、不要跳转页面。方法用login -->
  <el-form @submit.native.prevent="login">
    <el-form-item label="用户名">
      <el-input v-model="model.username" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="model.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form-item>
  </el-form>
</el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model:{}
      }
    },
    methods: {
      async login(){
        const res = await this.$http.post('login',this.model)
        // void res
        localStorage.token = res.data.token
        // console.log('token is :'+res.data.token)
        this.$router.push('/')
        this.$message({
          type:'success',
          message:'登陆成功'
        })
      }
    }
  }
</script>

<style scoped>
.login-card{
  width:25rem;
  margin:6rem auto;
}

</style>