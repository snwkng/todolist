import {
  getTodo,
  getTodos,
  getTodosByGroup
} from '@/services/todo.service'

export default {
  async GET_TODO ({ commit }, id) {
    try {
      const todo = await getTodo(id)
      commit('SET_TODO', todo)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async GET_TODOS ({ commit }) {
    try {
      const todos = await getTodos()
      commit('SET_TODOS', todos)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async GET_TODOS_BY_GROUP ({ commit }, id) {
    try {
      const todoByGroup = await getTodosByGroup(id)
      commit('SET_TODOS_BY_GROUP', todoByGroup)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  }
}
