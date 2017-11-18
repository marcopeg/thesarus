// @flow
/* eslint consistent-return: off */

// import libraries
import type { $Request, $Response } from 'express'
import express from 'express'

import { sendData, sendError } from '../../lib/jsonapi'
import { getModel } from '../../services/pg'

/**
 * Errors Declaration
 */

/**
 * Routes Declaration
 */

const router = express.Router()
export default router

router.get('/:w',
    getWord)

router.get('/',
    listWords)

/**
 * Local Middlewares
 */

/**
 * Routes Implementation
 */

async function getWord (req: $Request, res: $Response) {
    try {
        const Link = await getModel('Link')
        const Word = await getModel('Word')

        const word = await Word.findOne({
            where: {
                id: req.params.w,
            },
            raw: true,
        })

        if (!word) {
            sendError(res, 404, 'word not found', {
                detail: `the word '${req.params.w}' was not found in the db, please contribute and add that word`,
            })
            return
        }

        const links = await Link.findAll({
            where: {
                $or: [
                     { w1: word.id },
                     { w2: word.id },
                ],
            },
            raw: true,
        })

        // this can be optimized in 1 query filtering "in[id, id, id]"
        const synonyms = await Promise.all(links.map(async link =>
             Word.findOne({
                 where: {
                     id: link.w1 === word.id ? link.w2 : link.w1,
                 },
                 raw: true,
             })
        ))

        sendData(res, {
            data: {
                type: 'words',
                id: word.id,
                attributes: { word },
                relationships: {
                    synonyms: {
                        data: synonyms.map(item => ({
                            type: 'words',
                            id: item.id,
                        })),
                    },
                },
            },
            included: synonyms.map(item => ({
                type: 'words',
                id: item.id,
                attributes: item,
            })),
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}

async function listWords (req: $Request, res: $Response) {
    try {
        const Word = await getModel('Word')
        const words = await Word.findAll({ raw: true })

        sendData(res, {
            data: words.map(word => ({
                type: 'words',
                id: word.id,
                attributes: word,
            })),
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}
