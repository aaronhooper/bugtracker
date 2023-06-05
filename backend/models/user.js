const { model, models } = require('mongoose')
const userSchema = require('../schemas/user')

module.exports = models.User || model('User', userSchema)
