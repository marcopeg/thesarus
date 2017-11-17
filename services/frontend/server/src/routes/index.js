/**
 * Application's routes configuration
 */

// @flow
import { $App } from 'express'

// import project's middlewares

import rootRouter from './root'
import projectsRouter from './api-v1/projects'
import cardsRouter from './api-v1/cards'

export default (app: $App) => {
    app.use('/api/v1/projects', projectsRouter)
    app.use('/api/v1/cards', cardsRouter)

    // client rendering
    app.use('/', rootRouter)
}
