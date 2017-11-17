import React from 'react'
import PropTypes from 'prop-types'

import Grid from 'react-bootstrap/lib/Grid'

const DefaultLayout = ({ children }) => (
    <Grid>
        {children}
    </Grid>
)

DefaultLayout.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
}

export default DefaultLayout
