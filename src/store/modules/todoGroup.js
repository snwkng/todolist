import axios from 'axios'

// initial state
const state = () => ({
  allTogoGroups: [],
  todoError: null,

  activeGroup: {}
})

// getters
const getters = {
  favorite: state => {
    return state.allTogoGroups.filter(item => item.group_name === 'Избранное')[0]
  }
}

// actions
const actions = {
  async getTodoGroups ({ rootState, commit }) {
    await axios.get(`todo-group/all/${rootState.auth.user.id}`).then(response => {
      commit('SET_TODO_GROUPS', response.data)
    })
  },
  addSelectTodoGroup ({ commit }, group) {
    commit('SET_SELECT_TODO_GROUP', group)
  },
  async addTodoGroup ({ commit, dispatch }, newList) {
    await axios.post('todo-group', newList).then(() => {
      dispatch('getTodoGroups')
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },
  async deleteTodoGroup ({ dispatch, commit }, todoGroup) {
    try {
      await axios.delete(`todo-group/delete/list/${todoGroup._id}`).then(() => {
        dispatch('getTodoGroups')
      })
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async updateTodoGroup ({ dispatch, commit }, todoGroup) {
    try {
      await axios.put(`todo-group/update/list/${todoGroup._id}`, todoGroup).then(() => {
        dispatch('getTodoGroups')
      })
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  }
}

// mutations
const mutations = {
  SET_TODO_GROUPS (state, allGroup) {
    state.allTogoGroups = allGroup
  },
  SET_TODO_ERROR (state, error) {
    state.todoError = error
  },
  SET_SELECT_TODO_GROUP (state, group) {
    state.activeGroup = group
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
