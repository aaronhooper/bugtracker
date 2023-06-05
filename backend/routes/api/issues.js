const express = require('express')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../middleware/requireAuth')
const User = require('../../models/user')
const createError = require('http-errors')
const router = express.Router({ mergeParams: true })

router.post('/', requireAuth(), asyncHandler(async (req, res) => {
  const { username, project_name: projectName } = req.params
  const { title, status, description } = req.body
  const author = req.auth.username

  await User.findOneAndUpdate(
    { username, 'projects.name': projectName },
    { $push: { 'projects.$.issues': { title, status, description, author } } }
  ).exec()

  return res.status(201).json({ message: 'Issue created' })
}))

router.get('/:issue_id', asyncHandler(async (req, res) => {
  const { issue_id: issueId, project_name: projectName } = req.params
  const user = await User.findOne({ 'projects.issues._id': issueId }, { 'projects.issues': 1 }).exec()

  if (!user) {
    throw createError(404, 'Issue not found')
  }

  const project = user.projects.find((project) => project.name === projectName)
  const issue = project.issues.find((issue) => issue._id === issueId)
  return res.json(issue)
}))

router.use('/:issue_id/comments', require('./comments'))

module.exports = router
