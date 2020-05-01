const path = require('path')

module.exports = {
    entry: './src/client.jsx',
    output: {
        path: path.resolve(__dirname, '../static/webpack'),
        filename: 'client.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
}