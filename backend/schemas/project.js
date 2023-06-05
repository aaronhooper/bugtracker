const { Schema, model } = require('mongoose')
const IssueSchema = require('./issue')

const projectSchema = new Schema({
  name: { type: String, required: true },
  owner: String,
  issues: [IssueSchema]
})

projectSchema.statics.userOwnsProjectWithName = async function (userId, projectName) {
  const project = await model('Project').exists({
    name: projectName,
    owner: userId
  }).exec()

  return project !== null
}

module.exports = projectSchema
