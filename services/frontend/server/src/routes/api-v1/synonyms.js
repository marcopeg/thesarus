// @flow
/* eslint consistent-return: off */

// import libraries
import type { $Request, $Response } from 'express'
import express from 'express'

import { sendError } from '../../lib/jsonapi'
import upsertWord from '../../lib/upsert-word'
import upsertLink from '../../lib/upsert-link'

/**
 * Routes Declaration
 */

const router = express.Router()
export default router

router.post('/:w1/:w2',
    addSynonym)

/**
 * Local Middlewares
 */

/**
 * Routes Implementation
 */

async function addSynonym (req: $Request, res: $Response) {
    try {
        await upsertWord(req.params.w1)
        await upsertWord(req.params.w2)
        await upsertLink(req.params.w1, req.params.w2)
        res.send({
            data: {
                type: 'links',
                id: `${req.params.w1}-${req.params.w2}`,
            },
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}
