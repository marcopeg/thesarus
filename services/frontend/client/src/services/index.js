/* eslint global-require: off, import/prefer-default-export: off */

/**
 * Boot the services in an asynchronous chain so to guarantee that
 * init / start are subsequential
 */

import eachSeries from 'async/eachSeries'

const services = [
    require('./words-service'),
]

class ServicesInitError extends Error {}
class ServicesStartError extends Error {}

export const configServices = async (store) => {
    const serviceInit = async (service, next) => {
        try {
            await service.init(store.dispatch, store.getState)
            next()
        } catch (e) {
            next(e)
        }
    }

    const serviceStart = async (service, next) => {
        try {
            await service.start(store.dispatch, store.getState)
            next()
        } catch (e) {
            next(e)
        }
    }

    eachSeries(services.filter(service => service.init), serviceInit, (initError) => {
        if (initError) {
            throw new ServicesInitError(initError.message)
        }

        eachSeries(services.filter(service => service.start), serviceStart, (startError) => {
            if (startError) {
                throw new ServicesStartError(startError.message)
            }
        })
    })
}
