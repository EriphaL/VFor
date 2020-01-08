import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import Character from '../views/Character.vue'


Vue.use(VueRouter)

const routes = [{
    // main中包含导航条
    path: '/',
    name: 'main',
    component: Main,
    children: [{
        path: '/',
        name: 'home',
        component: Home
      },
      // props所有在path里面传递的参数，都映射到组件参数中去 
      {
        path: '/articles/:id',
        name: 'article',
        component: Article,
        props: true
      }
    ]
  },{
    path: '/heroes/:id',
    name: 'hero',
    component: Hero,
    props: true
  }, {
    path: '/character/:id',
    name: 'character',
    component: Character,
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router