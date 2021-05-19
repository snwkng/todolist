const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const { routes } = require('./routes')

// инициализируем приложение
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// подключение к бд
mongoose.connect(
  'mongodb://localhost:27017/todolist',
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }
)

routes.forEach(element => {
  if (element === 'todoGroup') {
    app.use('/api/todo-group', require(`./routes/${element}`))
  } else {
    app.use(`/api/${element}`, require(`./routes/${element}`))
  }
})
// объявим роуты
const PORT = 3000
http.createServer({}, app).listen(PORT)
console.log(`Server running at ${PORT}`)
