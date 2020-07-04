import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import Layout from '../views/Layout.vue';
import D3 from '../views/D3.vue';
import D3Test from '../views/D3Test.vue';
import D3AnyTouch from '../views/D3AnyTouch.vue';
import Citys from '../views/Citys.vue';
import ReD3 from '../views/ReD3.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    //   //加一个参数表明可以被公开访问
    //   meta: {
    //     isPublic: true
    //   }
    // }, 
    {
      path: '/',
      name: 'main',
      component: Main,
      // 添加子路由
      children: [
        //下面是分类管理的
        {
          path: 'categories/list',
          name: 'list',
          component: CategoryList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'categories/create',
          name: 'create',
          component: CategoryEdit

        },
        // props为true，表示把url中的id注入到组件categoryEdit中，可以直接使用id
        {
          path: 'categories/edit/:id',
          name: 'edit',
          component: CategoryEdit,
          props: true
        },
        {
          path: 'week01/layouts',
          name: 'layout',
          component: Layout,
        },
        {
          path: 'week02/d3',
          name: 'd3',
          component: D3,
        },
        {
          path: 'week02/test',
          name: 'd3Test',
          component: D3Test,
        },
        {
          path: 'week02/anytouch',
          name: 'anytouch',
          component: D3AnyTouch,
        },
        {
          path: 'week02/citys',
          name: 'citys',
          component: Citys,
        },
        {
          path: 'week02/red3',
          name: 'red3',
          component: ReD3,
        }
       
      ]
    },
  ]
})



// router.beforeEach((to, from, next) => {
//   // console.log(to.meta)
//   if (!to.meta.isPublic && !localStorage.token) {
//     console.log('need login')
//     // return next('/login')
//   }
//   next()
// })

export default router