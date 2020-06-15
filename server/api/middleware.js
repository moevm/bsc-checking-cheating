const jwt = require('jsonwebtoken')

const checkToken = accessType => (req, res, next) => {
  let token = req.headers['authorization']

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json('Failed to authenticate token')
      }

      if (decoded.accessType !== accessType) {
        return res.status(403).json('Wrong access type')
      }

      req.id = decoded.id
      next()
    })
  } else {
    return res.status(401).json('No token provided')
  }
}

module.exports = checkToken
