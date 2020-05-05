const express = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('../webpack.dev.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static('static'))

app.listen(3000, function () {
    console.log('App started on port 3000')
  })
  
  
