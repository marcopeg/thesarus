/* global module */

const config = require('../config')

module.exports = {
    test: /\.svg$/,
    exclude: config.svgSearchPaths,
    use: [
        'url-loader?mimetype=image/svg+xml&name=fonts/[name].[ext]',
    ],
}
