/* eslint
    import/no-extraneous-dependencies: off,
    global-require: off,
*/

/* global __dirname */

const path = require('path')
const webpack = require('webpack')
const poststylus = require('poststylus')
const glob = require('glob')
const hash = require('custom-hash')

const config = require('./webpack/config')
const externals = require('./webpack/externals')
const resolve = require('./webpack/resolve')
const node = require('./webpack/node')

/* eslint-disable */
hash.configure({ right: true, maxLength: 10 })

let componentName = filePath => {
    let name = path.basename(filePath)
    return name.replace('.styleguide.jsx', '')
}

let componentRoute = filePath => {
    const token = hash.digest(filePath)
    const name = componentName(filePath)
    return `/${token}/${name}`
}

let styleguide = glob.sync(path.join(config.path.src, '**/*.styleguide.js?(x)'))
    .map(filePath => path.relative(config.path.src, filePath))
    .map(filePath => ({
        name: componentName(filePath),
        path: componentRoute(filePath),
        component: filePath,
    }))
// console.log(styleguide)
// process.exit(0)
/* eslint-enable */

// eslint-disable-next-line
module.exports = {
    entry: {
        app: [
            'babel-polyfill',

            'react-hot-loader/patch',
            // activate HMR for React

            `webpack-dev-server/client?http://${config.styleguide.host}:${config.styleguide.port}`,
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            path.join(config.styleguide.src, 'core', 'index.js'),
            // the entry point of our app
        ],
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/',
    },

    resolve,
    externals,
    node,

    devtool: 'inline-source-map',

    module: {
        rules: [
            require('./webpack/loaders/js'),

            // Due to dynamic import we need to exclude files that may be
            // referenced by webpack but we don't really treat directly
            {
                loader: 'empty-loader',
                exclude: [
                    /\.global.styl$/,
                    /\.module.styl$/,
                ],
                test: /\.styl$/,
            },

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
                STYLEGUIDE: JSON.stringify(styleguide),
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
        host: config.styleguide.host,
        port: config.styleguide.port,

        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true,
        // enable HMR on the server

        contentBase: config.styleguide.src,
    },

}
