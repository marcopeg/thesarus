import React from 'react'
import PropTypes from 'prop-types'

// $FlowFixMe
import styles from './FullLayout.module.styl'

const FullLayout = ({ children, color }) => (
    <div
      className={styles.wrapper}
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
}

export default FullLayout
