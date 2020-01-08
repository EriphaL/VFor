import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// import CategoryCreate from '../views/CategoryCreate.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import VEdit from '../views/VEdit.vue'
import VList from '../views/VList.vue'

import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login,
      //加一个参数表明可以被公开访问
      meta: {
        isPublic: true
      }
    }, {
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
        //-------下面是物品管理的
        {
          path: 'items/list',
          name: 'list',
          component: ItemList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'items/create',
          name: 'create',
          component: ItemEdit

        },
        // props为true，表示把url中的id注入到组件ItemEdit中，可以直接使用id
        {
          path: 'items/edit/:id',
          name: 'edit',
          component: ItemEdit,
          props: true
        },
        //-------下面是英雄管理的
        {
          path: 'heroes/list',
          name: 'list',
          component: HeroList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'heroes/create',
          name: 'create',
          component: HeroEdit

        },
        // props为true，表示把url中的id注入到组件ItemEdit中，可以直接使用id
        {
          path: 'heroes/edit/:id',
          name: 'edit',
          component: HeroEdit,
          props: true
        },
        //-------下面是文章管理的
        {
          path: 'articles/list',
          name: 'list',
          component: ArticleList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'articles/create',
          name: 'create',
          component: ArticleEdit

        },
        // props为true，表示把url中的id注入到组件ItemEdit中，可以直接使用id
        {
          path: 'articles/edit/:id',
          name: 'edit',
          component: ArticleEdit,
          props: true
        },
        //-------下面是广告位管理的
        {
          path: 'ads/list',
          name: 'list',
          component: AdList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'ads/create',
          name: 'create',
          component: AdEdit

        },
        // props为true，表示把url中的id注入到组件ItemEdit中，可以直接使用id
        {
          path: 'ads/edit/:id',
          name: 'edit',
          component: AdEdit,
          props: true
        },
        //-------下面是用户管理
        {
          path: 'admin_users/list',
          name: 'list',
          component: AdminUserList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'admin_users/create',
          name: 'create',
          component: AdminUserEdit

        },
        // props为true，表示把url中的id注入到组件ItemEdit中，可以直接使用id
        {
          path: 'admin_users/edit/:id',
          name: 'edit',
          component: AdminUserEdit,
          props: true
        },

        //-------下面是v的
        {
          path: 'vcards/list',
          name: 'list',
          component: VList
        },
        //两个路径不一样，引用的组件一样，在component中判断
        {
          path: 'vcards/create',
          name: 'create',
          component: VEdit

        },
        // props为true，表示把url中的id注入到组件ItemEdit中，可以直接使用id
        {
          path: 'vcards/edit/:id',
          name: 'edit',
          component: VEdit,
          props: true
        },
      ]
    },
  ]
})



router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  if (!to.meta.isPublic && !localStorage.token) {
    console.log('need login')
    // return next('/login')
  }
  next()
})

export default router