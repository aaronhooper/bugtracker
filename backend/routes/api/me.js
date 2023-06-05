const express = require('express')
const User = require('../../models/user')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const router = express.Router({ mergeParams: true })

// get user
// put user

// delete user
router.delete('/', asyncHandler(async (req, res, next) => {
  await User.deleteOne({ _id: req.auth.userId }).exec()
  return res.json({ message: 'User deleted' })
}))

// get projects
router.get('/projects', asyncHandler(async (req, res, next) => {
  const { userId } = req.auth
  const user = await User.findOne({ _id: userId }, { projects: 1 }).exec()
  const { projects } = user

  return res.json(projects)
}))

// get project
router.get('/projects/:project_name', asyncHandler(async (req, res, next) => {
  const { userId } = req.auth
  const { project_name: projectName } = req.params

  const user = await User
    .findOne({ _id: userId, 'projects.name': projectName }, { projects: 1, _id: 0 })
    .exec()

  if (!user) {
    throw createError(404, 'Project could not be found')
  }

  const { projects: [project] } = user

  return res.json(project)
}))

// put project
// delete project
// router.use('/projects/:project_name')

// post project
router.post('/projects', asyncHandler(async (req, res, next) => {
  const { userId, username: author } = req.auth
  const newProjectName = req.body.name

  const user = await User.findOne({
    _id: userId,
    'projects.name': newProjectName
  }).exec()

  if (user) {
    throw createError(409, 'A project with that name already exists on your user')
  }

  await User.updateOne(
    { _id: userId },
    { $push: { projects: { name: newProjectName, author } } }
  )

  return res.status(201).json({ message: 'Project created.' })
}))

module.exports = router
