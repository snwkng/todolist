const express = require('express')
const session = require('express-session')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const http = require('http')
const cors = require('cors')
const { routes } = require('./routes')
const passport = require('passport')
const auth = require('./routes/auth')

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'very secret this is',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', auth)
app.get('/', (req, res) => res.send('hoooome'))
routes.forEach(element => {
  app.use(`/api/${element}`, require(`./routes/${element}`))
})
// объявим роуты
const PORT = 3000
http.createServer({}, app).listen(PORT)
console.log(`Server running at ${PORT}`)
