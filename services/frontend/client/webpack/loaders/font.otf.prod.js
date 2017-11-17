/* global module */

const config = require('../config')

module.exports = {
    test: /\.[ot]tf$/,
    use: [
        `url-loader?limit=${config.assets.inlineLimit}&mimetype=application/octet-stream&name=${config.assets.path.fonts}/[name].[ext]`,
    ],
}
