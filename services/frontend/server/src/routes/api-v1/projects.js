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

router.get('/',
    getProjects)

router.post('/',
    addProject)

/**
 * Local Middlewares
 */

/**
 * Routes Implementation
 */

async function getProjects (req: $Request, res: $Response) {
    try {
        const Project = await getModel('Project')
        const projects = await Project.findAll({ raw: true })
        res.send(projects)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function addProject (req: $Request, res: $Response) {
    try {
        const Project = await getModel('Project')
        const project = await Project.create(req.body)
        res.send(project)
    } catch (e) {
        res.status(500).send(e)
    }
}
