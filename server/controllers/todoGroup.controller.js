const genericCrud = require('./generic.controller')
const { TodoGroup } = require('../model')
const boom = require('boom')

module.exports = {
  ...genericCrud(TodoGroup),
  async getTodoGroupByUser ({ params: { userId }, res }) {
    try {
      const items = await TodoGroup.find({ user_id: userId })
      return res.status(200).send(items)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }
}
