const { model, models } = require('mongoose')
const projectSchema = require('../schemas/project')

module.exports = models.Project || model('Project', projectSchema)
