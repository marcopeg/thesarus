/* global module */

const config = require('../config')

module.exports = {
    test: /\.woff2$/,
    use: [
        `url-loader?limit=${config.assets.inlineLimit}&mimetype=applicationfont-woff2&name=${config.assets.path.fonts}/[name].[ext]`,
    ],
}
