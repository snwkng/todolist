import { request } from './generic.service'

const getTodo = (id) => request({ url: `todo/${id}`, method: 'get' })
const getTodos = () => request({ url: 'todo', method: 'get' })
const getTodosByGroup = (groupID) => request({ url: `todo/${groupID}`, method: 'get' })

// todo group
const getAllTodoGroup = () => request({ url: 'todoGroup', method: 'get' })
const addListForTodoGroup = (data) => request({ url: 'todoGroup', method: 'post', data: data })

export {
  getTodo,
  getTodos,
  getAllTodoGroup,
  getTodosByGroup,
  addListForTodoGroup
}
