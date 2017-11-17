/**
 * Application's routes configuration
 */

// @flow
import { $App } from 'express'

// import project's middlewares

import rootRouter from './root'
import synonymRouter from './api-v1/synonym'

export default (app: $App) => {
    app.use('/api/v1/synonym', synonymRouter)

    // client rendering
    app.use('/', rootRouter)
}
