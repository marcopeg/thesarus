import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import 'Styles/index.global.styl'
import App from 'Containers/App'

import MuiTheme from './material-ui'
import store from './store'
import history from './history'

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

const Boot = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiTheme>
                <App />
            </MuiTheme>
        </ConnectedRouter>
    </Provider>
)

export default Boot

if (process.env.NODE_ENV === 'development') {
    window.navigateTo = $ => history.push($)
    window.reduxStore = store
}
