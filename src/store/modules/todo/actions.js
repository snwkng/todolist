import {
  getTodo,
  getTodos,
  getTodosByGroup,
  createTodo,
  deleteTodo
} from '@/services/todo.service'

export default {
  async GET_TODO ({ commit }, id) {
    try {
      const todo = await getTodo(id)
      commit('SET_TODO', todo)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async GET_TODOS ({ commit }) {
    try {
      const todos = await getTodos()
      commit('SET_TODOS', todos)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async GET_TODOS_BY_GROUP ({ commit }, id) {
    try {
      const todoByGroup = await getTodosByGroup(id)
      commit('SET_TODOS_BY_GROUP', todoByGroup)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async CREATE_TODO ({ dispatch, commit }, todo) {
    try {
      await createTodo(todo)
      dispatch('GET_TODOS_BY_GROUP', todo.todo_group)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  },
  async DELETE_TODO ({ dispatch, commit }, todo) {
    try {
      await deleteTodo(todo._id)
      dispatch('GET_TODOS_BY_GROUP', todo.todo_group)
    } catch (error) {
      commit('SET_TODO_ERROR', error)
    }
  }
}
