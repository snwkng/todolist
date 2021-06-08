import axios from 'axios'

// initial state
const state = () => ({
  todo: {},
  todos: [],
  todosByGroup: [],
  todoEditor: null,
  editableTodo: null,
  todoError: null
})

// getters
const getters = {}

// actions
const actions = {
  async getTodo ({ commit }, id) {
    await axios.get(`todo/${id}`).then(response => {
      commit('SET_TODO', response.data)
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },
  async getTodos ({ commit }) {
    await axios.get('todo').then(response => {
      commit('SET_TODOS', response.data)
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },
  async getTodosByGroup ({ commit }, id) {
    await axios.get(`todo/${id}`).then(response => {
      commit('SET_TODOS_BY_GROUP', response.data)
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },
  async createTodo ({ dispatch, commit }, todo) {
    await axios.post('todo/create', todo).then(() => {
      dispatch('getTodosByGroup', todo.todo_group)
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },
  async deleteTodo ({ dispatch, commit }, todo) {
    await axios.delete(`todo/delete/${todo._id}`).then(() => {
      dispatch('getTodosByGroup', todo.todo_group)
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },
  async updateTodo ({ commit, dispatch }, todo) {
    await axios.put(`todo/update/${todo._id}`, todo).then(() => {
      dispatch('getTodosByGroup', todo.todo_group)
    }).catch(error => {
      commit('SET_TODO_ERROR', error)
    })
  },

  updateTodoValue ({ commit }, todoValue) {
    commit('SET_TODO_VALUE', todoValue)
  },
  updateEditableTodo ({ commit }, editTodoValue) {
    commit('SET_TODO_EDIT_VALUE', editTodoValue)
  }
}

// mutations
const mutations = {
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
  },
  SET_TODO_VALUE (state, todoValue) {
    state.todoEditor = todoValue
  },
  SET_TODO_EDIT_VALUE (state, editTodoValue) {
    state.editableTodo = editTodoValue
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
