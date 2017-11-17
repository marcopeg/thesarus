// @flow
/* eslint consistent-return: off */

// import libraries
import type { $Request, $Response } from 'express'
import express from 'express'
import { getModel } from '../../services/pg'

/**
 * Routes Declaration
 */

const router = express.Router()
export default router

router.get('/:projectId',
    getCardsByProject)

router.get('/',
    getCards)

router.post('/',
    addCard)

router.put('/:id/quadrant',
    setQuadrant)

router.put('/:id/moscow',
    setMoscow)

/**
 * Local Middlewares
 */

/**
 * Routes Implementation
 */

async function getCards (req: $Request, res: $Response) {
    try {
        const Card = await getModel('Card')
        const cards = await Card.findAll()
        res.send(cards)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getCardsByProject (req: $Request, res: $Response) {
    try {
        const { projectId } = req.params
        const Card = await getModel('Card')
        const cards = await Card.findAll({ where: { projectId } })
        res.send(cards)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function addCard (req: $Request, res: $Response) {
    try {
        const Card = await getModel('Card')
        const card = await Card.create(req.body)
        res.send(card)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function setQuadrant (req: $Request, res: $Response) {
    try {
        const { id } = req.params
        const Card = await getModel('Card')
        const card = await Card.findOne({ where: { id } })
        const result = await card.update({ quadrant: req.body.quadrant || null })
        res.send(result)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function setMoscow (req: $Request, res: $Response) {
    try {
        const { id } = req.params
        const Card = await getModel('Card')
        const card = await Card.findOne({ where: { id } })
        const result = await card.update({ moscow: req.body.moscow || null })
        res.send(result)
    } catch (e) {
        res.status(500).send(e)
    }
}
