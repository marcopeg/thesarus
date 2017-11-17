import React from 'react'
import createHistory from 'history/createHashHistory'
import { Router, Route } from 'react-router-dom'

import MuiTheme from 'root/material-ui'


import 'Styles/index.global.styl'
import './styleguide.global.styl'
import components from '../index'

import HomeScreen from './HomeScreen'
import SingleComponentScreen from './SingleComponentScreen'
import RenderAllScreen from './RenderAllScreen'

const history = createHistory()

const renderMenu = () => (
    <HomeScreen components={components} />
)

const renderComponent = props => () => (
    <SingleComponentScreen {...props} />
)

const renderAll = () => (
    <RenderAllScreen components={components} />
)

const Root = () => (
    <Router history={history}>
        <MuiTheme>
            <div>

                <Route exact path={'/'} render={renderMenu} />
                <Route exact path={'/all'} render={renderAll} />

                {components.map(({ path, ...props }) => (
                    <Route
                      exact
                      key={path}
                      path={path}
                      render={renderComponent({ ...props })}
                    />
                ))}
            </div>
        </MuiTheme>
    </Router>
)

export default Root

if (process.env.NODE_ENV === 'development') {
    window.navigateTo = $ => history.push($)
}
