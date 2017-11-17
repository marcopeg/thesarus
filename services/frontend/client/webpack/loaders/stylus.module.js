/* global module */

module.exports = {
    test: /\.module.styl/,
    exclude: '/node_modules/',
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
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
