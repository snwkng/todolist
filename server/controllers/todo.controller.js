const genericCrud = require('./generic.controller')
const { Todo } = require('../model')

module.exports = {
  ...genericCrud(Todo)
}
