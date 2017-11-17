/* global module */
/* eslint import/no-extraneous-dependencies: off */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    test: /\.global.css$/,
    exclude: '/node_modules/',
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
            },
            {
                loader: 'postcss-loader',
            },
        ],
    }),
}
