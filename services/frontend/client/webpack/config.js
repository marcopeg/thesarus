/* global module, __dirname */

const path = require('path')

module.exports = {
    path: {
        src: path.join(__dirname, '..', 'src'),
        dist: path.join(__dirname, '..', 'dist'),
        public: path.join(__dirname, '..', 'public'),
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
    },
    svgSearchPaths: [
        path.join(__dirname, '..', 'src', 'assets', 'images'),
        path.join(__dirname, '..', 'src', 'components'),
        path.join(__dirname, '..', 'src', 'containers'),
        path.join(__dirname, '..', 'src', 'routes'),
        path.join(__dirname, '..', 'src', 'layouts'),
    ],
    assets: {
        inlineLimit: 6500,
        path: {
            images: 'images',
            fonts: 'fonts',
        },
    },
    styleguide: {
        src: path.join(__dirname, '..', 'styleguide'),
        host: '0.0.0.0',
        port: 4000,
    },
}
