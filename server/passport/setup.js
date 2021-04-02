const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (username, password, done) {
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return err
    } else {
      if (user) {
        if (password === user.password) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Incorrect password.' })
        }
      } else {
        return done(null, false, { message: 'Incorrect username.' })
      }
    }
  })
}))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    err ? done(err) : done(null, user)
  })
})
