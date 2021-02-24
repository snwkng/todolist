const router = require('express-promise-router')()

const { todoGroup } = require('../controllers')

router.route('/:id').get(todoGroup.get)
router.route('/').post(todoGroup.create)
router.route('/').get(todoGroup.getAll)
router.route('/:id').put(todoGroup.update)
router.route('/:id').delete(todoGroup.delete)

module.exports = router
