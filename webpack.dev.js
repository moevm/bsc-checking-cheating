const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    devServer: {
        contentBase: './static/webpack',
        hot: true
    },
    entry: ['webpack-hot-middleware/client', 'src/client.tsx'],
    output: {
        path: path.resolve(__dirname, 'static/webpack'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
              test: /\.(jsx|tsx)$/,
              include: /node_modules/,
              use: ['react-hot-loader/webpack']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
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
    plugins: [
        new HTMLWebpackPlugin({
          alwaysWriteToDisk: true,
          template: 'src/index.html'
        }),
        new HTMLWebpackHarddiskPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TSConfigPathsPlugin()
        ]
    }
}