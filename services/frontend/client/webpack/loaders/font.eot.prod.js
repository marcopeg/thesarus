/* global module */

const config = require('../config')

module.exports = {
    test: /\.eot$/,
    use: [
        `url-loader?limit=${config.assets.inlineLimit}&mimetype=application/vnd.ms-fontobject&name=${config.assets.path.fonts}/[name].[ext]`,
    ],
}
