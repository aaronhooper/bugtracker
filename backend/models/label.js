const { model, models } = require('mongoose')
const labelSchema = require('../schemas/label')

module.exports = models.Label || model('Label', labelSchema)
