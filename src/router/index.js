import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/MainPage.vue'
import AuthPage from "../components/AuthPage.vue"
import SelectList from "../components/SelectList.vue"
// import { users } from '../fakeDB/users.js'
import store from "../store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('sibdevAccess') || store.getters.getLogined) {
        next();
      } else {
        next('/auth')
      }
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage
  },
  {
    path: '/list',
    name: 'list',
    component: SelectList,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('sibdevAccess') || store.getters.getLogined) {
        next();
      } else {
        next('/auth')
      }
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
