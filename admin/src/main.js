import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";

// import "./assets/style.css";

import List from "./components/List.vue";
import Card from "./components/Card.vue";
import Table from "./components/Table.vue";
import BreadCrumb from "./components/BreadCrumb.vue";

//递归组件

// import "mock/index.js" ;// 全局引入mock配置文件
import axios from "axios";
Vue.prototype.$axios = axios;


Vue.component("my-list", List);
Vue.component("my-card", Card);
Vue.component("my-table", Table);
Vue.component("my-bread-crumb", BreadCrumb);

Vue.config.productionTip = false;

import http from "./http";
//这样可以在任意的页面里用$http访问接口
Vue.prototype.$http = http;
// Vue.prototype.$http = axios.create({
//   baseURL: 'http://localhost:3000/api-docs'
// })
//全局定义可以使每一个vue实例都拥有这些东西
// Vue.mixin({
//   computed: {
//     uploadUrl() {
//       return this.$http.defaults.baseURL + "/upload";
//     },
//   },
//   methods: {
//     getAuthHeaders() {
//       return {
//         Authorization: `Bearer ${localStorage.token || ""}`,
//       };
//     },
//   },
// });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
