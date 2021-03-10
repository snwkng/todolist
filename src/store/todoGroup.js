import { getAllTodoGroup } from '../services/todo.service'

const mutations = {
  SET_TODOS_GROUP (state, allGroup) {
    state.allTogosGroup = allGroup
  },
  SET_TODO_ERROR (state, error) {
    state.todoError = error
  },
  SET_SELECT_GROUP (state, group) {
    state.activeGroup = group
  }
}

const actions = {
  async GET_TODOS_GROUP ({ commit }) {
    try {
      const allTogosGroup = await getAllTodoGroup()
      commit('SET_TODOS_GROUP', allTogosGroup)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  ADD_SELECT_GROUP ({ commit }, group) {
    commit('SET_SELECT_GROUP', group)
  }
}

const state = () => ({
  allTogosGroup: [],
  todoError: null,

  activeGroup: {}
})

const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
