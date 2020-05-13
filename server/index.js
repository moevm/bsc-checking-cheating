const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const router = require('./routes')
const app = express()
const config = require('../webpack.dev.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
  // writeToDisk: true
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static('static'))
app.use(bodyParser.json())

app.use('', router)

app.get('/api/v1/student_info', (req, res) => {
  res.json({ name: 'Dimitry', age: 20 })
})

app.listen(3000, function () {
    console.log('App started on port 3000')
  })
  
  
