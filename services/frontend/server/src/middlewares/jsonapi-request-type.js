// @flow

import type { $Request, $Response, $Next } from 'express'

import { sendError } from '../lib/jsonapi'

export const makeMiddleware = () =>
    async (req: $Request, res: $Response, next: $Next) => {
        if (req.get('Content-Type') === 'application/vnd.api+json') {
            next()
        } else {
            sendError(res, 400, 'wrong content type', {
                detail: 'this service implements http://jsonapi.org/ standard and require a specific Content-Type: application/vnd.api+json',
            })
        }
    }

export default makeMiddleware
