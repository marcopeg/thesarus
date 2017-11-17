/* global module */

const config = require('../config')

module.exports = {
    test: /\.svg$/,
    exclude: config.svgSearchPaths,
    use: [
        `url-loader?limit=${config.assets.inlineLimit}&mimetype=image/svg+xml&name=${config.assets.path.fonts}/[name].[ext]`,
    ],
}
