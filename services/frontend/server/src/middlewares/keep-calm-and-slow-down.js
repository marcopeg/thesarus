// @flow

import type { $Request, $Response, $Next } from 'express'

import winston from 'winston'
import pause from '../lib/pause'

export const makeMiddleware = (delay: number = 10) =>
    async (req: $Request, res: $Response, next: $Next) => {
        winston.info('[middleware] keep calm and slow down:', delay)
        await pause(delay)
        next()
    }

export default makeMiddleware
