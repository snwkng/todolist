import { getTodo, getTodos } from '../services/todo.service'

const mutations = {
  SET_TODO (state, todo) {
    state.todo = todo
  },
  SET_TODOS (state, todos) {
    state.todos = todos
  },
  SET_TODO_ERROR (state, error) {
    state.todoError = error
  }
}

const actions = {
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
  }
}

const state = () => ({
  todo: {},
  todos: [],
  todoError: null
})

const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
