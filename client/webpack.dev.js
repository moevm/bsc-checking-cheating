const path = require('path')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    entry: './src/client.tsx',
    output: {
        path: path.resolve(__dirname, '../static/webpack'),
        filename: '[name].js'
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
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        } 
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TSConfigPathsPlugin()
        ]
    }
}