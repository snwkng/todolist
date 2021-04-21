import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users/registration',
    name: 'Registration',
    component: () => import('../views/Authentication')
  },
  {
    path: '/users/login',
    name: 'Login',
    component: () => import('../views/Authentication')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
