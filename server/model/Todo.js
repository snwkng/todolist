const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  todo_name: {
    type: String,
    default: ''
  },
  todo_group: {
    type: ObjectId,
    ref: 'TodoGroup'
  }
})

module.exports = model('Todo', schema)
