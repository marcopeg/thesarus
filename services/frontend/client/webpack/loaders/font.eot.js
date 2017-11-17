/* global module */

module.exports = {
    test: /\.eot$/,
    use: [
        'url-loader?mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
    ],
}
