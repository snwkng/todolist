import { request } from './generic.service'

const getTodo = (id) => request({ url: `todo/${id}`, method: 'get' })
const getTodos = () => request({ url: 'todo', method: 'get' })
const getTodosByGroup = (groupID) => request({ url: `todo/${groupID}`, method: 'get' })

const createTodo = (todo) => request({ url: 'todo/create', method: 'post', data: todo })
const deleteTodo = (id) => request({ url: `todo/delete/${id}`, method: 'delete' })
const updateTodo = (todo) => request({ url: `todo/update/${todo._id}`, method: 'put', data: todo })

// todo group
const getAllTodoGroup = () => request({ url: 'todoGroup', method: 'get' })
const addListForTodoGroup = (data) => request({ url: 'todoGroup', method: 'post', data: data })
const deleteTodoGroup = (id) => request({ url: `todoGroup/delete/list/${id}`, method: 'delete' })

export {
  getTodo,
  getTodos,
  getAllTodoGroup,
  createTodo,
  deleteTodo,
  updateTodo,

  getTodosByGroup,
  addListForTodoGroup,
  deleteTodoGroup
}
