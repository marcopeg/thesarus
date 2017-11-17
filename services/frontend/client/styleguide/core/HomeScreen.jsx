import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import ComponentsList from './ComponentsList'

const HomeScreen = ({ components }) => (
    <div>
        <AppBar
          title="Welcome to the Styleguide"
          iconElementLeft={<span />}
        />

        <Paper style={{ margin: 20 }}>
            <List>
                <Subheader>Work on a single component:</Subheader>
                <ListItem>
                    <Link to={'/all'}>Render all the available components</Link>
                </ListItem>
            </List>

            <ComponentsList components={components} />
        </Paper>
    </div>
)

HomeScreen.propTypes = {
    components: PropTypes.array.isRequired, // eslint-disable-line
}

export default HomeScreen
