/**
 * Application's routes configuration
 */

// @flow
import { $App } from 'express'
import bodyParser from 'body-parser'

// import project's middlewares
import createJsonapiRequestType from '../middlewares/jsonapi-request-type'

// import project's routes
import rootRouter from './root'
// import synonymsRouter from './api-v1/synonyms'
// import wordsRouter from './api-v1/words'
import graphRouter from './api-v1/graph'

const jsonapiRequestType = createJsonapiRequestType()

const jsonBodyParser = bodyParser.json({
    type: 'application/vnd.api+json',
})

export default (app: $App) => {
    // app.use('/api/v1/synonyms', jsonapiRequestType, synonymsRouter)
    // app.use('/api/v1/words', jsonapiRequestType, wordsRouter)
    app.use('/api/v1/graph', [
        jsonBodyParser,
        jsonapiRequestType,
    ], graphRouter)

    // client rendering
    app.use('/', rootRouter)
}
