const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../../models/user')
const Project = require('../../models/project') // eslint-disable-line no-unused-vars
const createError = require('http-errors')
const router = express.Router()

// get users
router.get('/', asyncHandler(async (req, res, next) => {
  const users = await User.find({}, { password_hash: 0 }).exec()

  return res.json({ users })
}))

// get user
router.get('/:username', asyncHandler(async (req, res, next) => {
  const username = req.params.username

  const user = await User
    .findOne({ username }, { email: 0, password_hash: 0 })
    .exec()

  if (!user) {
    throw createError(404, 'User not found')
  }

  return res.json(user)
}))

// get projects
// get Project
// get issues
// get issue
// get comments
// get comment
router.use('/:username/projects', require('./projects'))

module.exports = router
