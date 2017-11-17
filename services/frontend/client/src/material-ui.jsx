/**
 * material-ui
 * (http://www.material-ui.com/)
 */

import React from 'react'
import PropTypes from 'prop-types'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// try-cacth preserves hot-loading
// eslint-disable-next-line
try { injectTapEventPlugin() } catch (e) {}

// Custom theme
const muiTheme = getMuiTheme({
    //  fontFamily: '\'Open Sans\', sans-serif'
    palette: {
        primary1Color: '#338fff',
    },
})

const MuiTheme = ({ children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {children}
    </MuiThemeProvider>
)

MuiTheme.propTypes = {
    children: PropTypes.element.isRequired,
}

export default MuiTheme
