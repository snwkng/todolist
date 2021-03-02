import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faTrash,
  faEllipsisV,
  faChevronDown,
  faCalendarDay,
  faCalendarAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faEdit,
  faTrash,
  faEllipsisV,
  faChevronDown,
  faCalendarDay,
  faCalendarAlt,
  faStar
)

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
