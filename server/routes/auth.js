const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('register-login', (req, res, next) => {
  passport.authenticate('local', function (error, user, info) {
    if (error) {
      return res.status(400).json({ error: error })
    }
    if (!user) {
      return res.status(400).json({ error: 'No user found' })
    }
    req.logIn(user, function (error) {
      if (error) {
        return res.status(400).json({ erorr: error })
      }
      res.status(200).json({ success: `logged in ${user.id}` })
    })
  })(req, res, next)
})

module.exports = router
