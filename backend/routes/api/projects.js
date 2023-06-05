const express = require('express')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')
const User = require('../../models/user')
const Project = require('../../models/project') // eslint-disable-line no-unused-vars

// `mergeParams` is required to access `:username` from parent router.
// https://stackoverflow.com/a/25305272/1396953
const router = express.Router({ mergeParams: true })

// get projects
router.get('/', asyncHandler(async (req, res, next) => {
  const username = req.params.username

  const user = await User
    .findOne({ username }, { projects: 1 })
    .exec()

  if (!user) {
    throw createError(404)
  }

  const { projects } = user

  return res.json(projects)
}))

// get project
router.get('/:project_name', asyncHandler(async (req, res, next) => {
  const { project_name: projectName, username } = req.params

  const user = await User
    .findOne({ username, 'projects.name': projectName }, { projects: 1, _id: 0 })
    .exec()

  if (!user) {
    throw createError(404, 'Project could not be found')
  }

  const project = user.projects.find(project => project.name === projectName)
  return res.json(project)
}))

router.use('/:project_name/issues', require('./issues'))

module.exports = router
