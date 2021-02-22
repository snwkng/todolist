import Vue from 'vue'
import Vuex from 'vuex'
import todo from '@/store/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo
  }
})
