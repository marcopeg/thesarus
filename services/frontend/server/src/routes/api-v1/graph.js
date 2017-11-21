// @flow
/* eslint consistent-return: off */

// import libraries
import type { $Request, $Response } from 'express'
import express from 'express'

import { sendData, sendError } from '../../lib/jsonapi'
import { getModel } from '../../services/pg'
import upsertEntity from '../../lib/upsert-entity'
import upsertLink from '../../lib/upsert-link'

/**
 * Errors Declaration
 */

/**
 * Routes Declaration
 */

const router = express.Router()
export default router

router.get('/links/:entityId',
    getLinksByEntity)

router.get('/:type',
    getEntitiesByType)

router.get('/',
    getEntities)

router.post('/',
    addEntities)

/**
 * Local Middlewares
 */

/**
 * Routes Implementation
 */

async function getLinksByEntity (req: $Request, res: $Response) {
    try {
        const Link = await getModel('Link')
        const Entity = await getModel('Entity')

        const link = await Link.findOne({
            where: { entity_id: req.params.entityId },
        })

        if (!link) {
            throw new Error('Link not found')
        }

        const links = await Link.findAll({
            where: { node_id: link.node_id },
        })

        const entities = await Entity.findAll({
            where: { id: { $in: links.map(item => item.entity_id) } },
        })

        const word = [ ...entities ].filter(item => item.id === req.params.entityId).shift()
        const synonyms = [ ...entities ].filter(item => item.id !== req.params.entityId)

        // const data = await Entity.findAll()
        sendData(res, {
            link,
            links,
            data: {
                type: 'word',
                id: word.id,
                attributes: word,
                relationships: {
                    synonyms: synonyms.map(item => ({
                        type: 'word',
                        id: item.id,
                    })),
                },
            },
            included: synonyms.map(item => ({
                type: 'word',
                id: item.id,
                attributes: item,
            })),
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}

async function getEntities (req: $Request, res: $Response) {
    try {
        const Entity = await getModel('Entity')
        const data = await Entity.findAll()
        sendData(res, {
            data: data.map(item => ({
                type: item.type,
                id: item.id,
                attributes: item,
            })),
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}

async function getEntitiesByType (req: $Request, res: $Response) {
    try {
        const Entity = await getModel('Entity')
        const data = await Entity.findAll({
            where: { type: { $like: req.params.type } },
        })
        sendData(res, {
            data: data.map(item => ({
                type: item.type,
                id: item.id,
                attributes: item,
            })),
        })
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}

async function addEntities (req: $Request, res: $Response) {
    try {
        const Link = await getModel('Link')
        const Node = await getModel('Node')
        const entities = await Promise.all(req.body.entities.map(upsertEntity))

        const link = await Link.findOne({
            where: {
                entity_id: { $in: entities.map(entity => entity.id) },
            },
        })

        let node
        if (link) {
            node = await Node.findOne({
                where: { id: link.node_id },
            })
        } else {
            node = await Node.create({})
        }

        const links = await Promise.all(
            req.body.entities.map(entity =>
                upsertLink(entity.id, node.id)
            )
        )

        sendData(res, links)
    } catch (e) {
        sendError(res, 500, e.message, e)
    }
}
