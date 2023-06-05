const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('the auth route')
})

router.use('/login', require('./login'))
router.use('/register', require('./register'))

module.exports = router
