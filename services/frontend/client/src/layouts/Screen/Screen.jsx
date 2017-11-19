import React from 'react'
import PropTypes from 'prop-types'

// $FlowFixMe
import styles from './Screen.module.styl'

const getWrapperStyles = ({ effect, isVisible }) => [
    styles.wrapper,
    styles[`${effect}--${isVisible ? 'entered' : 'exited'}`],
].join(' ')

const Screen = ({ isVisible, children, effect, color }) => (
    <div
      className={getWrapperStyles({ effect, isVisible })}
      style={{ backgroundColor: color }}
    >
        {children}
    </div>
)

Screen.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    isVisible: PropTypes.bool.isRequired,
    effect: PropTypes.oneOf([ 'none', 'slideLeft', 'slideUp' ]),
    color: PropTypes.string,
}

Screen.defaultProps = {
    effect: 'slideLeft',
    color: '#fff',
}

export default Screen
