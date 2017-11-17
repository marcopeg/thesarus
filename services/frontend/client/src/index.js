/* eslint-disable */

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

// Mobile browsers hack
import FastClick from 'fastclick';
window.addEventListener('load', () => {
    FastClick.attach(document.body);
})

import Root from './Root'

const rootEl = document.getElementById('react-root')

const render = Component => ReactDOM.render(
    <AppContainer>
        <Component/>
    </AppContainer>, rootEl)

render(Root)

if (module.hot) {
    module.hot.accept('./Root', () => render(Root))
}
