import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const Toolbar = ({ title, backBtn }) => (
    <AppBar
      title={title}
      showMenuIconButton={backBtn !== null}
      iconElementLeft={backBtn !== null ? (
          <IconButton onClick={backBtn}>
              <NavigationClose />
          </IconButton>
      ) : null}
    />
)

Toolbar.propTypes = {
    title: PropTypes.string.isRequired,
    backBtn: PropTypes.func,
}

Toolbar.defaultProps = {
    backBtn: null,
}

export default Toolbar
