
import Route from 'route-parser'
import logger from 'Lib/logger'

import { fetchSynonym } from 'Services/synonyms-service'

const routes = [{
    test: new Route('/:word'),
    action: fetchSynonym,
}]

const onLocationChange = ({ payload }) => (dispatch) => {
    const { pathname } = payload

    try {
        const { action, match } = routes
            .map(route => ({
                ...route,
                match: route.test.match(pathname),
            }))
            .filter(route => route.match)
            .shift()

        if (action) {
            dispatch(action(match))
        }
    } catch (e) {
        logger.verbose('Path handler not found for:', pathname)
    }
}

export default [
    {
        action: '@@router/LOCATION_CHANGE',
        handler: onLocationChange,
    },
]
