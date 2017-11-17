/* global module */

module.exports = {
    test: /\.woff2$/,
    use: [
        'url-loader?mimetype=applicationfont-woff2&name=fonts/[name].[ext]',
    ],
}
