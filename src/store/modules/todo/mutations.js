export default {
  SET_TODO (state, todo) {
    state.todo = todo
  },
  SET_TODOS (state, todos) {
    state.todos = todos
  },
  SET_TODOS_BY_GROUP (state, todosByGroup) {
    state.todosByGroup = todosByGroup
  },
  SET_TODO_ERROR (state, error) {
    state.todoError = error
  }
}
