/* eslint
    import/no-extraneous-dependencies: off,
    global-require: off,
*/

/* global __dirname */

const path = require('path')
const webpack = require('webpack')
const poststylus = require('poststylus')

const config = require('./webpack/config')
const externals = require('./webpack/externals')
const resolve = require('./webpack/resolve')
const node = require('./webpack/node')

// eslint-disable-next-line
module.exports = {
    entry: {
        app: [
            'babel-polyfill',

            'react-hot-loader/patch',
            // activate HMR for React

            `webpack-dev-server/client?http://${config.devServer.host}:${config.devServer.port}`,
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            path.join(config.path.src, 'index.js'),
            // the entry point of our app
        ],
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: `http://${config.devServer.host}:${config.devServer.port}/`,
    },

    resolve,
    externals,
    node,

    devtool: 'inline-source-map',

    module: {
        rules: [
            require('./webpack/loaders/js'),

            // Styles
            require('./webpack/loaders/css.global'),
            require('./webpack/loaders/css.module'),
            require('./webpack/loaders/stylus.global'),
            require('./webpack/loaders/stylus.module'),

            // Fonts
            require('./webpack/loaders/font.svg'),
            require('./webpack/loaders/font.woff'),
            require('./webpack/loaders/font.woff2'),
            require('./webpack/loaders/font.otf'),
            require('./webpack/loaders/font.eot'),

            // SVGs & Images
            require('./webpack/loaders/svg'),
            require('./webpack/loaders/img'),
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [ poststylus([ 'autoprefixer', 'rucksack-css' ]) ],
                },
            },
        }),
    ],

    devServer: {
        host: config.devServer.host,
        port: config.devServer.port,

        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true,
        // enable HMR on the server

        contentBase: config.path.public,

        // preserve hot reloading even with the hard coded public path
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },

}
