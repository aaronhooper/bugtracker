const { model, models } = require('mongoose')
const commentSchema = require('../schemas/comment')

module.exports = models.Comment || model('Comment', commentSchema)
