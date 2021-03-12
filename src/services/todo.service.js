import { request } from './generic.service'

const getTodo = (id) => request({ url: `todo/${id}`, method: 'get' })

const getTodos = () => request({ url: 'todo', method: 'get' })

const getAllTodoGroup = () => request({ url: 'todoGroup', method: 'get' })

const getTodosByGroup = (groupID) => request({ url: `todo/${groupID}`, method: 'get' })

export {
  getTodo,
  getTodos,
  getAllTodoGroup,
  getTodosByGroup
}
