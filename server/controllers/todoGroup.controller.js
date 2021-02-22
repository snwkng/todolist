const genericCrud = require('./generic.controller')
const { TodoGroup } = require('../model')

module.exports = {
  ...genericCrud(TodoGroup)
}
