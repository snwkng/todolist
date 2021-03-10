import Vue from 'vue'
import Vuex from 'vuex'
import todo from '@/store/todo'
import todoGroup from '@/store/todoGroup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo,
    todoGroup
  }
})
