const router = require('express-promise-router')()
const { check } = require('express-validator')
const { auth } = require('../controllers')
const fileUploader = require('../fileUploader')

router.route('/login').post(auth.login) // user.login
router.route('/registration').post([
  check('username', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль должен содержать больше 6 символов').isLength({ min: 6 })
], auth.registration) // user.register
router.route('/logout').post(auth.logout) // user.logout
router.route('/me').get(auth.getUserInfo) // me
router.route('/users').get(auth.getUsers) // user.getUsers
router.route('/user/update', fileUploader.single('avatar')).put(auth.updateUser)

module.exports = router
