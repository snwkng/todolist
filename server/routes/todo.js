const router = require('express-promise-router')()

const { todo } = require('../controllers')

router.route('/:groupID').get(todo.getTodoFromGroups)
router.route('/:id').get(todo.get)
router.route('/create').post(todo.create)
router.route('/').get(todo.getAll)
router.route('/update/:id').put(todo.update)
router.route('/delete/:id').delete(todo.delete)

module.exports = router
