const { model, models } = require('mongoose')
const issueSchema = require('../schemas/issue')

module.exports = models.Issue || model('Issue', issueSchema)
