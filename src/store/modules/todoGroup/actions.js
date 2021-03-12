import { getAllTodoGroup } from '@/services/todo.service'

export default {
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
