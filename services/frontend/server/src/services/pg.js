/* eslint
    no-underscore-dangle: off,
    no-await-in-loop: off,
*/

import winston from 'winston'
import Sequelize from 'sequelize'
import pause from '../lib/pause'

const __conn = {}
const __models = {}

const establishConnection = async (conn, maxAttempts, attemptDelay) => {
    let attempts = 0
    let lastErrorMSG = ''
    do {
        try {
            winston.verbose(`[db] Connection attemt ${attempts + 1}/${maxAttempts}`)
            await conn.authenticate()
            return true
        } catch (e) {
            attempts += 1
            lastErrorMSG = e.message
            winston.verbose(`[db] failed: ${e.message}`)
            await pause(attemptDelay * 1000)
        }
    } while (attempts < maxAttempts)

    throw new Error(`[db] ${lastErrorMSG}`)
}

export const initModels = async (conn, models) => {
    const promises = models.map(model => new Promise(async (resolve, reject) => {
        try {
            winston.verbose(`[db] init model ${model.name}`)
            __models[model.name] = await model.init(conn)
            resolve()
        } catch (err) {
            winston.verbose(`[db] failed to init model: ${model.name}`)
            winston.verbose(`[db] Error: ${err.message}`)
            winston.debug(err)
            reject()
        }
    }))

    return Promise.all(promises)
}

export const init = async (name, settings) => {
    __conn[name] = new Sequelize(settings.database, settings.username, settings.password, {
        host: settings.host,
        port: settings.port,
        dialect: 'postgres',
        logging: settings.logging,
    })
}

export const start = async (name, settings) => {
    try {
        await establishConnection(__conn[name], settings.maxAttempts, settings.attemptDelay)
    } catch (err) {
        throw new Error(`[db:${name}] Failed to establish a connection with the Postgres server.`)
    }

    try {
        await initModels(__conn[name], settings.models)
    } catch (err) {
        throw new Error(`[db:${name}] Failed to synchronize one or more models.`)
    }
}

export const getModel = (name) => {
    const model = __models[name]

    if (!model) {
        throw new Error(`Model "${name}" does not exists`)
    }

    return model
}

export default { models: __models }
