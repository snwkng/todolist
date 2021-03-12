export default {
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
