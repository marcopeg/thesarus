import React from 'react'
import PropTypes from 'prop-types'

// $FlowFixMe
import styles from './Screen.module.styl'

const getWrapperStyles = ({ effect, isVisible }) => [
    styles.wrapper,
    styles[`${effect}--${isVisible ? 'entered' : 'exited'}`],
].join(' ')

const Screen = ({ isVisible, children, effect }) => (
    <div className={getWrapperStyles({ effect, isVisible })}>
        {children}
    </div>
)

Screen.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    isVisible: PropTypes.bool.isRequired,
    effect: PropTypes.oneOf([ 'slideRight' ]),
}

Screen.defaultProps = {
    effect: 'slideRight',
}

export default Screen
