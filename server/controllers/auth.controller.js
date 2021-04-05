const { User } = require('../model')
const boom = require('boom')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

class AuthController {
  async registration (req, res) {
    try {
      const errorValidations = validationResult(req)
      if (!errorValidations.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errorValidations })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({ username, password: hashPassword })
      await user.save()
      return res.json({ message: `${user.username} успешно зарегестрирован!` })
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async login (req, res) {
    try {

    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async logout (req, res) {
    try {

    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async getUsers (req, res) {
    try {
      res.json('server work!')
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }
}

module.exports = new AuthController()
