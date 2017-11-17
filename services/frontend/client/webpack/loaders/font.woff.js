/* global module */

module.exports = {
    test: /\.woff$/,
    use: [
        'url-loader?mimetype=applicationfont-woff&name=fonts/[name].[ext]',
    ],
}
