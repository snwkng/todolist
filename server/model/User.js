const { model, Schema } = require('mongoose')

const User = new Schema({
  username: {
    type: String,
    unique: true,
    requred: true
  },
  password: {
    type: String,
    requred: true
  }
})

module.exports = model('User', User)
