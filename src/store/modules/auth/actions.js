import axios from 'axios'

export default {
  async GET_REGISTRATION ({ dispatch }, newUser) {
    await axios.post('auth/registration', newUser).then(response => {
      return dispatch('GET_ATTEMPT', response.data.token)
    })
  },
  async GET_LOGIN ({ dispatch }, credentials) {
    await axios.post('auth/login', credentials).then(response => {
      return dispatch('GET_ATTEMPT', response.data.token)
    })
  },
  async GET_ATTEMPT ({ commit, state }, token) {
    if (token) {
      commit('SET_TOKEN', token)
    }

    if (!state.token) {
      return
    }

    try {
      await axios.get('auth/me').then(response => {
        commit('SET_USER', response.data)
      })
    } catch (e) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  },
  logOut ({ commit }) {
    return axios.post('auth/logout').then(() => {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    })
  }
}
