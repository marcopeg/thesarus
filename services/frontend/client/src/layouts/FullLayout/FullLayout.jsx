import React from 'react'
import PropTypes from 'prop-types'

// $FlowFixMe
import styles from './FullLayout.module.styl'

const getWrapperStyles = props => [
    styles.wrapper,
    props.scrollable ? styles.scrollable : '',
    props.centered ? styles.centered : '',
].join(' ')

const FullLayout = ({ children, color, ...props }) => (
    <div
      className={getWrapperStyles(props)}
      style={{
          backgroundColor: color || 'inherith',
      }}
    >
        {children}
    </div>
)

FullLayout.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    color: PropTypes.string,
    centered: PropTypes.bool,
}

export default FullLayout
