const { User } = require('../model')
const boom = require('boom')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

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
        return res.status(400).json({
          message: 'Ошибка при регистрации',
          errorValidations
        })
      }
      const {
        username,
        password
      } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
      }
      const salt = await bcrypt.genSalt(6)
      const hash = await bcrypt.hash(password, salt)
      const user = new User({
        username,
        password: hash
      })
      user.token = generateAccessToken(user._id)
      await user.save()
      return res.status(201).send({ token: user.token })
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async login (req, res) {
    try {
      const {
        username,
        password
      } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(403).json({ message: `Пользователь с именем ${username} не найден` })
      }
      if (await bcrypt.compare(password, user.password)) {
        const token = generateAccessToken(user._id)
        await user.updateOne({ username: username }, { $set: { token: token } })
        return res.status(200).send({ token: user.token })
      } else {
        return res.status(403).json('Неверный пароль')
      }
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async logout (req, res) {
    try {
      return res.status(200).send('Success!')
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }

  async getUserInfo (req, res) {
    const authToken = req.headers.authorization
    if (!authToken) {
      return res.status(401).send({
        auth: false,
        message: 'No token provided.'
      })
    }
    jwt.verify(authToken, secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ message: 'invalid_token' })
      }
      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send('There was a problem finding the user.')
        if (!user) return res.status(404).send('User no found')

        res.status(200).send({
          id: user._id,
          name: user.username
        })
      })
    })
  }

  async getUsers (req, res) {
    try {
      const users = await User.find()
      res.json(users)
      res.json('server work!')
    } catch (e) {
      return res.status(400).send(boom.boomify(e))
    }
  }
}

module.exports = new AuthController()
