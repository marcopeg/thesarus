/* global module */

const config = require('../config')

module.exports = {
    test: /\.(gif|png|jpe?g)$/i,
    loaders: [
        {
            loader: 'url-loader',
            options: {
                limit: config.assets.inlineLimit,
                name: `${config.assets.path.images}/[name].[ext]`,
            },
        },
        {
            loader: 'image-webpack-loader',
            query: {
                mozjpeg: {
                    progressive: true,
                },
                gifsicle: {
                    interlaced: false,
                },
                optipng: {
                    optimizationLevel: 4,
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4,
                },
            },
        },
    ],
}
