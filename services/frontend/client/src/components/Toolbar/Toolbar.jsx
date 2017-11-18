import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'

const Toolbar = ({ title }) => (
    <AppBar
      title={title}
      showMenuIconButton={false}
    />
)

Toolbar.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Toolbar
