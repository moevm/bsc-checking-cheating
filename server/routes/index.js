const path = require('path')
const router = require('express').Router()

const clientRoutes = require('./clientRoutes')

router.get(clientRoutes, (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, '../../static/webpack'), 'index.html'))
})

module.exports = router
