/* global module */

module.exports = {
    test: /\.[ot]tf$/,
    use: [
        'url-loader?mimetype=application/octet-stream&name=fonts/[name].[ext]',
    ],
}
