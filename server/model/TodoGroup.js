const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
  group_name: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  todo: [
    {
      type: ObjectId,
      ref: 'Todo'
    }
  ],
  user_id: {
    type: ObjectId,
    ref: 'User'
  }
})

module.exports = model('TodoGroup', schema)
