import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'Company'

const routes = [
  {
    path: '/users/register',
    name: 'Registration',
    component: () => import('../views/Auth')
  },
  {
    path: '/users/login',
    name: 'Login',
    component: () => import('../views/Auth')
  },
  {
    path: '/',
    name: 'TodoList',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Home')
  },
  {
    path: '/user/account',
    name: 'Account',
    component: () => import('../views/Account')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/authenticated']) {
      return next('/users/login')
    } else {
      next()
    }
  }
  if ((to.name === 'Login' || to.name === 'Registration') && store.getters['auth/authenticated']) {
    return next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.name ? `${to.name} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
  })
})

router.onError(error => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload()
  }
})

export default router
