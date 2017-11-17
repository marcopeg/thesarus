/* global module */

const config = require('../config')

module.exports = {
    test: /\.woff$/,
    use: [
        `url-loader?limit=${config.assets.inlineLimit}&mimetype=applicationfont-woff&name=${config.assets.path.fonts}/[name].[ext]`,
    ],
}
