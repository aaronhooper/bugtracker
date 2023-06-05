const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('the index route')
})

router.use('/api', require('./api'))

module.exports = router
