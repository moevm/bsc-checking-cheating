const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('../webpack.dev.js')
const compiler = webpack(config)
const app = express()
const api = require('./api')
const router = require('./routes')

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
  // writeToDisk: true
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static('static'))
app.use(bodyParser.json())

app.use('/api/v1', api)
app.use('', router)

app.listen(3000, function () {
    console.log('App started on port 3000')
})
