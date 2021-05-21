const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  todo_name: {
    type: String,
    default: ''
  },
  todo_group: {
    type: ObjectId,
    ref: 'TodoGroup'
  },
  todo_done: {
    type: Boolean,
    default: false
  },
  todo_date: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: ObjectId,
    ref: 'User'
  }
})

module.exports = model('Todo', schema)
