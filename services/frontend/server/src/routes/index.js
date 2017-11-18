/**
 * Application's routes configuration
 */

// @flow
import { $App } from 'express'

// import project's middlewares
import createJsonapiRequestType from '../middlewares/jsonapi-request-type'

// import project's routes
import rootRouter from './root'
import synonymsRouter from './api-v1/synonyms'
import wordsRouter from './api-v1/words'

const jsonapiRequestType = createJsonapiRequestType()

export default (app: $App) => {
    app.use('/api/v1/synonyms', jsonapiRequestType, synonymsRouter)
    app.use('/api/v1/words', jsonapiRequestType, wordsRouter)

    // client rendering
    app.use('/', rootRouter)
}
