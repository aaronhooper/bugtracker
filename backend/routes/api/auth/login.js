const express = require('express')
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const router = express.Router()
const User = require('../../../models/user')

router.get('/', function (req, res, next) {
  res.send('the login route')
})

router.post('/', async function (req, res, next) {
  const rejectCredentials = (res) => res.status(401).json({ message: 'Invalid username or password.' })
  const { username, password } = req.body
  const user = await User.findOne({ username }).exec()

  if (!user) {
    return rejectCredentials(res)
  }

  const passwordMatch = await compare(password, user.password_hash)

  if (!passwordMatch) {
    return rejectCredentials(res)
  }

  const token = sign({
    userId: user._id,
    username: user.username,
    roles: user.roles
  }, process.env.SECRET_KEY, {
    expiresIn: '1h',
    algorithm: 'HS256'
  })

  return res.json({ token })
})

module.exports = router
