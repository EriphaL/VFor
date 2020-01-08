import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL:'http://localhost:3006/admin/api'
})
//在请求头里加一个代表登录信息的token字段
http.interceptors.request.use(function(config){
  if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
},function(error){
  return Promise.reject(error)
})

// 给整个请求加上一个拦截器
http.interceptors.response.use(res =>{
  return res
},err=>{
  //挂在原型上弹出的是‘用户不存在’
  Vue.prototype.$message({
    type:'error',
    message:err.response.data.message
  })
  //没有登录的话报错提示提供token 路由跳转到前端页面
  if(err.response.status === 401){
    router.push('/login')
  }

  return Promise.reject(err)
})

//导出
export default http