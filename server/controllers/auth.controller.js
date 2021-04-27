const { User } = require('../model')
const boom = require('boom')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const saltRounds = 10
const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

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
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) return err
        const user = new User({ username, password: hash })
        user.token = generateAccessToken(user._id)
        user.save()
        return res.status(200).json({ message: `${user.username} успешно зарегестрирован!` })
      })
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: `Пользователь с именем ${username} не найден` })
      }
      bcrypt.compare(password, user.password, function (err, validPassword) {
        if (err || !validPassword) {
          console.log('ads')
          return res.status(400).json({ message: 'Неверный пароль' })
        }
        const token = generateAccessToken(user._id)
        user.updateOne({ username: username }, { $set: { token: token } })
        return res.status(200).json({ user })
      })
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async logout (req, res) {
    try {
      jwt.destroy(localStorage.token)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async getUsers (req, res) {
    try {
      const users = await User.find()
      res.json(users)
      res.json('server work!')
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }
}

module.exports = new AuthController()
