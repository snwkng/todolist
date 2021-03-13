import { getAllTodoGroup, addListForTodoGroup } from '@/services/todo.service'

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
  },
  async ADD_GROUP ({ dispatch }, newList) {
    await addListForTodoGroup(newList).then(() => {
      dispatch('GET_TODOS_GROUP')
    }).catch(error => {
      console.log(error)
    })
  }
}
