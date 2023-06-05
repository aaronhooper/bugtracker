const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../../../models/user')
const isEmail = require('validator/lib/isEmail')
const { default: isAlphanumeric } = require('validator/lib/isAlphanumeric')
const isStrongPassword = require('validator/lib/isStrongPassword')

const SALT_ROUNDS = 12

router.get('/', function (req, res, next) {
  res.send('the register route')
})

router.post('/', async function (req, res, next) {
  // - extract username email and password from body
  const { username, email, password } = req.body

  const passwordOptions = {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
  }

  // - verify username, email, password length/complexity requirements
  if (!isEmail(email)) {
    return res.status(422).json({
      message: 'Please enter a valid email address.'
    })
  }

  if (!isAlphanumeric(username)) {
    return res.status(422).json({
      message: 'Username must only contain alphanumeric characters.'
    })
  }

  if (!isStrongPassword(password, passwordOptions)) {
    return res.status(422).json({
      message: 'Password must be 8 characters or over and have at least one lowercase, uppercase, number, and symbol character.'
    })
  }

  // - assert username and email don't already exist
  const usernameOrEmailExists = await User.usernameOrEmailExists(username, email)

  if (usernameOrEmailExists) {
    return res.status(409).json({
      message: 'Username or email exists.'
    })
  }

  // - hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  // - save all in db
  const user = new User({
    username,
    email,
    password_hash: passwordHash,
    roles: ['USER']
  })

  await user.save()

  // - return 201
  return res.status(201).json({
    message: 'User successfully created.'
  })
})

module.exports = router
