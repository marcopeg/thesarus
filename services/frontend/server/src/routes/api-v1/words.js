// @flow
/* eslint consistent-return: off */

// import libraries
import type { $Request, $Response } from 'express'
import express from 'express'

import { sendError } from '../../lib/jsonapi'
import { getModel } from '../../services/pg'

/**
 * Routes Declaration
 */

const router = express.Router()
export default router

router.get('/',
    listWords)

/**
 * Local Middlewares
 */

/**
 * Routes Implementation
 */

async function listWords (req: $Request, res: $Response) {
    try {
        const Word = await getModel('Word')
        const words = await Word.findAll({ raw: true })

        res.send({
            data: words.map(word => ({
                type: 'words',
                id: word.value,
                attributes: word,
            })),
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}
