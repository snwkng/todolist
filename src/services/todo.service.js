import { request } from './generic.service'

const getTodo = (id) => request({ url: `todo/${id}`, method: 'get' })

const getTodos = () => request({ url: 'todo', method: 'get' })

export {
  getTodo,
  getTodos
}
