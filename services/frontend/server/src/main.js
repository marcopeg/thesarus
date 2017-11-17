// @flow
/* eslint import/prefer-default-export: off */

import winston from 'winston'

import { init as initConfig, get as getConfig } from './lib/config'
import { init as initVendorSrc } from './services/vendor-src'
import { init as initServer, start as startServer } from './services/server'

import {
    init as initPostgres,
    start as startPostgres,
} from './services/pg'

// import Project from './models/project'
// import Card from './models/card'

export async function start (): any {
    try {
        await initConfig()
        winston.level = getConfig('LOG_LEVEL')
        winston.level = 'verbose'

        // Init db
        winston.verbose('[boot] init postgres connection')
        await initPostgres('crawler', {
            host: String(getConfig('PG_HOST')),
            port: Number(getConfig('PG_PORT')),
            database: String(getConfig('PG_DATABASE')),
            username: String(getConfig('PG_USER')),
            password: String(getConfig('PG_PASSWORD')),
            logging: winston.debug,
        })

        await initVendorSrc()
        await initServer({
            serverName: String(getConfig('SERVER_NAME')),
            cookieSecret: String(getConfig('SERVER_SECRET')),
        })

        winston.info('[boot] --> initialization completed with success :-)')

        // Start db connection
        await startPostgres('crawler', {
            maxAttempts: Number(getConfig('PG_MAX_CONN_ATTEMPTS')),
            attemptDelay: Number(getConfig('PG_CONN_ATTEMPTS_DELAY')),
            models: [
                // Project,
                // Card,
            ],
        })

        winston.verbose('[boot] start ExpressJS')
        await startServer({
            port: Number(getConfig('SERVER_PORT')),
        })

        winston.info('[boot] --> services warm up completed with success :-)')
    } catch (err) {
        winston.error('[boot] FATAL ERROR :-(')
        winston.error(err.message)
        winston.debug(err)
        process.exit(1)
    }
}
