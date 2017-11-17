/* global module */

module.exports = {
    test: /\.global.css$/,
    exclude: '/node_modules/',
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
            },
        },
    ],
}
