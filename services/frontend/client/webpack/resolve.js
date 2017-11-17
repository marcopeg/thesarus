/* global module, __dirname */

const path = require('path')
const config = require('./config')

module.exports = {
    extensions: [ '.js', '.jsx' ],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: [ 'index', 'main' ],

    alias: {
        root: path.resolve(config.path.src),
        Components: path.resolve(config.path.src, 'components'),
        Containers: path.resolve(config.path.src, 'containers'),
        Layouts: path.resolve(config.path.src, 'layouts'),
        Reducers: path.resolve(config.path.src, 'reducers'),
        Routes: path.resolve(config.path.src, 'routes'),
        Sagas: path.resolve(config.path.src, 'sagas'),
        Services: path.resolve(config.path.src, 'services'),
        Lib: path.resolve(config.path.src, 'lib'),
        Styles: path.resolve(config.path.src, 'styles'),
    },
}
