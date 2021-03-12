const genericCrud = require('./generic.controller')
const { Todo } = require('../model')
const boom = require('boom')

module.exports = {
  ...genericCrud(Todo),

  async getTodoFromGroups ({ params: { groupID }, res }) {
    try {
      const items = await Todo.find({ todo_group: groupID })
      return res.status(200).send(items)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }
}
