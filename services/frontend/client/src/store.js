/* eslint no-underscore-dangle: off, global-require: off */
/* global window */

import { applyMiddleware, compose as composeEnhancers } from 'redux'
import reduxThunk from 'redux-thunk'
// import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware as createRouterMiddleware } from 'react-router-redux'

// redux-sagas injector and redux-injector by
// https://github.com/GuillaumeCisco/redux-sagas-injector
import { createInjectSagasStore as createStore, sagaMiddleware as reduxSaga } from 'redux-sagas-injector'

import { configSagas, rootSaga } from './sagas'
import { configServices } from './services'
import reducers from './reducers'
import { configListeners } from './listeners'
import { reduxEventsMiddleware } from './lib/redux-events-middleware'

const routerMiddleware = createRouterMiddleware(history)

const rootReducer = {
    ...reducers,
    routing: routerReducer,
}

import _initialState from 'external_initial_state' // eslint-disable-line
const initialState = _initialState || {}
let __store // eslint-disable-line

// -- Production --
if (process.env.NODE_ENV === 'production') {
    const enhanceWith = applyMiddleware(reduxThunk, reduxSaga, reduxEventsMiddleware, routerMiddleware) // eslint-disable-line
    const middlewares = composeEnhancers(enhanceWith)
    __store = createStore(rootReducer, rootSaga, initialState, middlewares)
    configServices(__store)
    configSagas(reduxSaga)
    configListeners()

// -- Development --
} else if (process.env.NODE_ENV === 'development') {
    const devComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers
    const enhanceWith = applyMiddleware(reduxThunk, reduxSaga, reduxEventsMiddleware, routerMiddleware) // eslint-disable-line
    const middlewares = devComposeEnhancers(enhanceWith)
    __store = createStore(rootReducer, rootSaga, initialState, middlewares)
    configServices(__store)
    configSagas(reduxSaga)
    configListeners()
}

export default __store
