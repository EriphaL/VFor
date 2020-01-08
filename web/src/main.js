import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import './assets/scss/_variable.scss'
import './assets/font/font.scss'
import router from './router'
// 幻灯片轮播框架
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'
// 扑克牌卡片效果
import VueSwing from 'vue-swing'
Vue.component('vue-swing', VueSwing)


import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
import VCard from './components/VCard.vue'

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3006/web/api'
})

Vue.config.productionTip = false


Vue.use(VueAwesomeSwiper, /* { default global options } */ )

Vue.component('m-card',Card)
Vue.component('m-list-card', ListCard)
Vue.component('m-v-card', VCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
