// @flow
import type { $Request, $Response } from 'express'

// import libraries
import winston from 'winston'
import express from 'express'
import { get as getConfig } from '../lib/config'

// import middlewares
import { getSources } from '../services/vendor-src'

/**
 * Routes Declaration
 */

const router = express.Router()
export default router

// We suggest you declare a route and list all the middlewares that
// should be involved plus the route handler in an array.
router.get('/*', [
    renderHomePage,
])

/**
 * Routes Implementation
 */

// We suggest you implement all your route handlers as classic functions
// so you can keep the routes declaration at the very begining of the file
// (https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
function renderHomePage (req: $Request, res: $Response) {
    winston.verbose('serve index page')
    res.render('index', {
        meta: {
            title: getConfig('SERVER_NAME'),
            node_env: process.env.NODE_ENV,
            src: getSources(),
        },
        shared_data: {
            app_name: getConfig('SERVER_NAME'),
            node_env: process.env.NODE_ENV,
        },
    })
}
