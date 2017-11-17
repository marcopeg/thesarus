/**
 * Babel wrapper to the full app
 */

// SUPER DEV THING
// process.env.NODE_ENV = 'production'

require('babel-polyfill')

require('babel-core/register')({
    plugins: [ 'transform-object-rest-spread', 'transform-async-to-generator' ],
    presets: [ 'es2015', 'es2017', 'react' ],
})

require('./src/main').start()
