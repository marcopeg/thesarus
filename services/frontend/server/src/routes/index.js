/**
 * Application's routes configuration
 */

// @flow
import { $App } from 'express'

// import project's middlewares

import rootRouter from './root'
import synonymsRouter from './api-v1/synonyms'
import wordsRouter from './api-v1/words'

export default (app: $App) => {
    app.use('/api/v1/synonyms', synonymsRouter)
    app.use('/api/v1/words', wordsRouter)

    // client rendering
    app.use('/', rootRouter)
}
