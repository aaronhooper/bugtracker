const express = require('express')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../middleware/requireAuth')
const User = require('../../models/user')
const router = express.Router({ mergeParams: true })
const createError = require('http-errors')

router.get('/', asyncHandler(async (req, res, next) => {
  const {
    username,
    project_name: projectName,
    issue_id: issueId
  } = req.params

  const user = await User.findOne({
    username,
    projects: {
      $elemMatch: {
        name: projectName,
        'issues._id': issueId
      }
    }
  }).exec()

  const project = user.projects.find((project) => project.name === projectName)
  const comments = project.issues.at(0).comments
  return res.json({ comments })
}))

router.get('/:comment_id', asyncHandler(async (req, res, next) => {
  const {
    username,
    project_name: projectName,
    issue_id: issueId,
    comment_id: commentId
  } = req.params

  const user = await User.findOne({
    username,
    projects: {
      $elemMatch: {
        name: projectName,
        'issues._id': issueId,
        'issues.comments._id': commentId
      }
    }
  }).exec()

  if (!user) {
    return createError(404, 'The comment could not be found')
  }

  // We extract the project first, then extract the comment. $elemMatch will not
  // get rid of other projects.
  const project = user.projects.find((project) => project.name === projectName)
  const comment = project.issues.at(0).comments.at(0)
  return res.json({ comment })
}))

router.post('/', requireAuth(), asyncHandler(async (req, res, next) => {
  const { username, project_name: projectName, issue_id: issueId } = req.params
  const { body } = req.body
  const { username: author } = req.auth

  // Here we use arrayFilters because we have more than one positional ($).
  await User.findOneAndUpdate(
    { username, 'projects.name': projectName, 'projects.issues._id': issueId },
    { $push: { 'projects.$[project].issues.$[issue].comments': { author, body } } },
    { arrayFilters: [{ 'project.name': projectName }, { 'issue._id': issueId }] }
  ).exec()

  return res.status(201).json({ message: 'Comment created' })
}))

module.exports = router
