const { Schema, model } = require('mongoose')
const ProjectSchema = require('./project')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  projects: [ProjectSchema],
  roles: [{ type: String, required: true }],
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

userSchema.statics.usernameOrEmailExists = async function (username, email) {
  const user = await model('User').findOne({
    $or: [
      { username },
      { email }
    ]
  }).exec()

  return user !== null
}

module.exports = userSchema
