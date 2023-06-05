const { expressjwt: jwt } = require('express-jwt')

function requireAuth () {
  return jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  })
}

module.exports = { requireAuth }
