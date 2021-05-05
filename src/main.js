import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import feather from 'vue-icon'
import axios from 'axios'

require('./services/subscriber')

axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'

Vue.use(feather, 'v-icon')

Vue.config.productionTip = false

store.dispatch('auth/GET_ATTEMPT', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
