/* eslint
    import/no-extraneous-dependencies: off,
    global-require: off,
*/

/* global __dirname */

const pkg = require('./package.json')
const path = require('path')
const webpack = require('webpack')
const poststylus = require('poststylus')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./webpack/config')
const externals = require('./webpack/externals')
const resolve = require('./webpack/resolve')
const node = require('./webpack/node')

// eslint-disable-next-line
module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.join(config.path.src, 'index.js'),
        ],
    },

    output: {
        path: config.path.dist,
        publicPath: '/',
        filename: `${pkg.name}_${pkg.version}_[name].js`,
        chunkFilename: `${pkg.name}_${pkg.version}_[name]_[chunkhash].js`,
    },

    resolve,
    externals,
    node,

    module: {
        rules: [
            require('./webpack/loaders/js'),

            // Styles
            require('./webpack/loaders/css.global.prod'),
            require('./webpack/loaders/css.module.prod'),
            require('./webpack/loaders/stylus.global.prod'),
            require('./webpack/loaders/stylus.module.prod'),

            // Fonts
            require('./webpack/loaders/font.svg.prod'),
            require('./webpack/loaders/font.woff.prod'),
            require('./webpack/loaders/font.woff2.prod'),
            require('./webpack/loaders/font.otf.prod'),
            require('./webpack/loaders/font.eot.prod'),

            // SVGs & Images
            require('./webpack/loaders/svg'),
            require('./webpack/loaders/img'),
        ],
    },

    plugins: [
        new ExtractTextPlugin(`${pkg.name}_${pkg.version}_[name].css`),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false,
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),

        new HtmlWebpackPlugin({
            title: pkg.title,
            template: path.join(config.path.public, 'index.dist.hbs'),
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [ poststylus([ 'autoprefixer', 'rucksack-css' ]) ],
                },
            },
        }),
    ],
}
