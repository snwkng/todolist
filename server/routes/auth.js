const router = require('express-promise-router')()

const { user } = require('../controllers')

router.route('/login').post(user.login) // user.login
router.route('/register').post(user.register) // user.register
router.route('/logout').get(user.logout) // user.logout

module.exports = router
