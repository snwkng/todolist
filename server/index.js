const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')

// подключение к бд
mongoose.connect(
  'mongodb://mongodb:27017/todolist',
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
// инициализируем приложение
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// объявим роуты
const PORT = 3000
http.createServer({}, app).listen(PORT)
console.log(`Server running at ${PORT}`)
