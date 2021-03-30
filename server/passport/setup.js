const bcrypt = require('bcryptjs')
const User = require('../model/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user)
  })
})

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        const newUser = new User({ email, password })
        // Hash password before saving in database
        bcrypt.genSalt(10, (_error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error
            newUser.password = hash
            newUser.save().then(user => {
              return done(null, user)
            }).catch(error => {
              return done(null, false, { message: error })
            })
          })
        })
        // Return other user
      } else {
        // Match password
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) throw error

          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Wrong password' })
          }
        })
      }
    }).catch(error => {
      return done(null, false, { message: error })
    })
  })
)

module.exports = passport
