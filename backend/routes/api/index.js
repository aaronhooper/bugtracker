const express = require('express')
const { requireAuth } = require('../../middleware/requireAuth')
const User = require('../../models/user')
const asyncHandler = require('express-async-handler')
const router = express.Router()

router.get('/projects', asyncHandler(async function (req, res, next) {
  console.log('reached')
  const users = await User.find({}).exec()
  const projects = users.flatMap(({ projects }) => projects)

  return res.json({ projects })
}))

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/me', requireAuth(), require('./me'))

module.exports = router
