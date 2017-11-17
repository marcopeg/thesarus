/* global module */
/* eslint import/no-extraneous-dependencies: off */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    test: /\.module.styl/,
    exclude: '/node_modules/',
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[hash:base64:5]',
                },
            },
            {
                loader: 'stylus-loader',
                options: {
                    paths: [
                        'node_modules/bootstrap-styl',
                        'src/styles',
                    ],
                },
            },
        ],
    }),
}
