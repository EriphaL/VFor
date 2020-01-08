import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './assets/style.css'

Vue.config.productionTip = false

import http from './http'
//这样可以在任意的页面里用$http访问接口
Vue.prototype.$http = http
//全局定义可以使每一个vue实例都拥有这些东西
Vue.mixin({
  computed: {
    uploadUrl(){
      return  this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
