const { Schema } = require('mongoose')

const commentSchema = new Schema({
  author: String,
  body: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = commentSchema
