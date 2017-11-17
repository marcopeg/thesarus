import React from 'react'
import PropTypes from 'prop-types'
import { injectReducer } from 'redux-injector'
import { injectSaga } from 'redux-sagas-injector'

const DefaultComponent = () => null
const DefaultFallback = () => null

class AsyncRouteWrapper extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            isReady: this.props.isReady,
            component: this.props.component,
        }
    }

    // need to check whether the component has unmounted
    componentWillMount () {
        const onRouteLoad = (route) => {
            if (this.has_unmounted) {
                return
            }

            route = route.default ? route.default : route // eslint-disable-line
            this.setState({
                isReady: true,
                component: route.component,
            })
        }

        if (!this.props.isReady && !this.has_unmounted) {
            this.props.promise.then(onRouteLoad)
        }
    }

    componentWillUnmount () {
        this.has_unmounted = true
    }

    render () {
        const { fallback: Fallback } = this.props
        const { isReady, component: Component } = this.state
        return React.createElement(isReady ? Component : Fallback)
    }
}

AsyncRouteWrapper.propTypes = {
    isReady: PropTypes.bool,
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    fallback: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    promise: PropTypes.instanceOf(Promise),
}

/**
 * Async Route Definition
 * allows to dynamically inject reducers and sagas into the application
 */
export const configAsyncRoute = (loadRouteChunk, fallback = DefaultFallback) => {
    let isReady = false
    let promise = null
    let component = DefaultComponent

    // Route{render} handler that is given to react-router
    return () => {
        if (promise === null) {
            promise = loadRouteChunk()

            promise.then((route) => {
                isReady = true
                route = route.default ? route.default : route // eslint-disable-line
                component = route.component

                // inject reducers
                Object.keys(route.reducers || {}).forEach((key) => {
                    injectReducer(key, route.reducers[key])
                })

                // inject sagas
                Object.keys(route.sagas || {}).forEach((key) => {
                    injectSaga(key, route.sagas[key])
                })
            })
        }

        return React.createElement(AsyncRouteWrapper, {
            isReady,
            promise,
            component,
            fallback,
        })
    }
}

/**
 * Synchronous Route Definition
 * at the moment it triggers a state update warning if we try to
 * inject new reducers. This is not a problem as synchronous routes should
 * not define reducers or sagas by themselves
 */
export const configSyncRoute = route =>
    () => React.createElement(route.component)
