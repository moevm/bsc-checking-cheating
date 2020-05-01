const path = require('path')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/client.tsx',
    output: {
        path: path.resolve(__dirname, '../static/webpack'),
        filename: 'client.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
           
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TSConfigPathsPlugin()
        ]
    }
}