// @flow

import winston from 'winston'
import path from 'path'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'

// import project's libraries
import { get as getConfig } from '../lib/config'

// import project's routes
import configRoutes from '../routes'

const app = express()

export const init = async ({ serverName, cookieSecret }: ServerInitParams) => {
    app.set('name', serverName)

    // development setup
    if (getConfig('NODE_ENV') === 'development') {
        winston.info('[development] setup cors')
        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }))
    }

    // template engine
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'pug')

    // Compression
    if (getConfig('NODE_ENV') === 'production') {
        app.use(compression())
    }

    // static files
    if (getConfig('NODE_ENV') === 'production') {
        app.use(express.static(path.join(__dirname, '..', '..', 'react-www')))
    }
    app.use(express.static(path.join(__dirname, '..', '..', 'public')))

    // middlewares
    app.use('/api', bodyParser.json())
    app.use('/api', cookieParser(cookieSecret))

    // routes
    configRoutes(app)
}

export const start = async ({ port }: ServerStartParams) => {
    app.listen(port, () => {
        winston.info('%s running on port %s', app.get('name'), port)
    })
}
