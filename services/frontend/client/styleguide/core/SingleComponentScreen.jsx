import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import RenderComponentBody from './RenderComponentBody'

const renderBackBtn = () => (
    <Link to={'/'}>
        <IconButton iconStyle={{ color: '#fff' }}>
            <NavigationClose />
        </IconButton>
    </Link>
)

const SingleComponentScreen = ({ name, component }) => (
    <div>
        <AppBar
          title={`Styleguide :: ${name}`}
          iconElementLeft={renderBackBtn()}
        />

        <Paper style={{ margin: 20, padding: 10 }}>
            <RenderComponentBody component={component} />
        </Paper>
    </div>
)

SingleComponentScreen.propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
}

export default SingleComponentScreen
