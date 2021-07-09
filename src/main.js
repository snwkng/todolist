import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import feather from 'vue-icon'
import axios from 'axios'
import { time, date, dateTime } from '@/filters/Date'
import VCalendar from 'v-calendar'

require('./services/subscriber')

axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'

Vue.use(feather, 'v-icon')
Vue.use(VCalendar, {
  componentPrefix: 'vc' // Use <vc-calendar /> instead of <v-calendar />
})
Vue.filter('time', time)
Vue.filter('date', date)
Vue.filter('dateTime', dateTime)
Vue.config.productionTip = false

store.dispatch('auth/GET_ATTEMPT', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
