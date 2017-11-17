/* global module */

module.exports = {
    test: /\.global.styl/,
    exclude: '/node_modules/',
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'stylus-loader',
            options: {
                sourceMap: true,
                paths: [
                    'node_modules/bootstrap-styl',
                    'src/styles',
                ],
            },
        },
    ],
}
