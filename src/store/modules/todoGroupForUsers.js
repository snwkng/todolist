import axios from 'axios'

// initial state
const state = () => ({

})

// getters
const getters = {}

// actions
const actions = {
  async getTodoGroups ({ commit }, userId) {
    await axios.get(`todoGroup/all/${userId}`).then(response => {
      commit('todoGroup/SET_TODOS_GROUP', response.data, { root: true })
    })
  }
}

// mutations
const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
