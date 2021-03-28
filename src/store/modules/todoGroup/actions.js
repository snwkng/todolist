import {
  getAllTodoGroup,
  addListForTodoGroup,
  deleteTodoGroup,
  updateTodoGroup
} from '@/services/todo.service'

export default {
  async GET_TODOS_GROUP ({ commit }) {
    try {
      const allTogosGroup = await getAllTodoGroup()
      commit('SET_TODOS_GROUP', allTogosGroup)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  ADD_SELECT_TODO_GROUP ({ commit }, group) {
    commit('SET_SELECT_TODO_GROUP', group)
  },
  async ADD_TODO_GROUP ({ dispatch }, newList) {
    await addListForTodoGroup(newList).then(() => {
      dispatch('GET_TODOS_GROUP')
    }).catch(error => {
      console.log(error)
    })
  },
  async DELETE_TODO_GROUP ({ dispatch, commit }, todoGroup) {
    try {
      await deleteTodoGroup(todoGroup._id)
      dispatch('GET_TODOS_GROUP')
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async UPDATE_TODO_GROUP ({ dispatch, commit }, todoGroup) {
    try {
      await updateTodoGroup(todoGroup)
      dispatch('GET_TODOS_GROUP')
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  }
}
