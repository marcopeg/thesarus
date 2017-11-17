/* global module */

const config = require('../config')

module.exports = {
    test: /\.svg$/,
    include: config.svgSearchPaths,
    loaders: [
        'babel-loader',
        {
            loader: 'react-svg-loader',
            options: {
                es5: true,
                svgo: {
                    plugins: [{ removeTitle: false }],
                    floatPrecision: 2,
                },
            },
        },
    ],
}
