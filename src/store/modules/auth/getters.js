export default {
  authenticated (state) {
    return state.token && state.user
  },
  user (state) {
    return state.user
  }
}
