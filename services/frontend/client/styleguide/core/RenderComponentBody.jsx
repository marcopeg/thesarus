import React, { createElement } from 'react'
import PropTypes from 'prop-types'

const ComponentBody = ({ component }) => (
    <div>
        {createElement(component)}
    </div>
)

ComponentBody.propTypes = {
    component: PropTypes.func.isRequired,
}

export default ComponentBody
