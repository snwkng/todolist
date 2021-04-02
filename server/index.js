const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const passport = require('passport')

const { routes } = require('./routes')

// подключение к бд
mongoose.connect(
  'mongodb://localhost:27017/todolist',
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
// инициализируем приложение
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: 'very secret this is',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

routes.forEach(element => {
  app.use(`/api/${element}`, require(`./routes/${element}`))
})
// объявим роуты
const PORT = 3000
http.createServer({}, app).listen(PORT)
console.log(`Server running at ${PORT}`)
