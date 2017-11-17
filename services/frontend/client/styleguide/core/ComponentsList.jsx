import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const ComponentsList = ({ components }) => (
    <List>
        <Subheader>Work on a single component:</Subheader>
        {components.map(({ path, name }) => (
            <ListItem key={path}>
                <Link to={path}>{name}</Link>
            </ListItem>
        ))}
    </List>
)

ComponentsList.propTypes = {
    components: PropTypes.array.isRequired, // eslint-disable-line
}

export default ComponentsList
