const router = require('express-promise-router')()

const { auth } = require('../controllers')

router.route('/login').post(auth.login) // user.login
router.route('/register').post(auth.registration) // user.register
router.route('/logout').get(auth.logout) // user.logout
router.route('/users').get(auth.getUsers) // user.logout

module.exports = router
