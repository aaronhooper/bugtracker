const { Schema } = require('mongoose')

const labelSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, default: 'FFFFFF', required: true }
})

module.exports = labelSchema
