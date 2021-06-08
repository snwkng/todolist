const { model, Schema } = require('mongoose')

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  token: {
    type: String
  }
})

module.exports = model('User', User)
