const { Schema } = require('mongoose')
const CommentSchema = require('./comment')
const LabelSchema = require('./label')

const issueSchema = new Schema({
  author: String,
  title: { type: String, required: true },
  description: String,
  status: { type: String, required: true, default: 'open' },
  labels: [LabelSchema],
  comments: [CommentSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = issueSchema
