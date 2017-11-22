import React from 'react'
import PropTypes from 'prop-types'

// $FlowFixMe
import styles from './FullLayout.module.styl'

const getWrapperStyles = props => [
    styles.wrapper,
    props.scrollable ? styles.scrollable : '',
    props.centered ? styles.centered : '',
].join(' ')

const FullLayout = ({ children, color, dataTest, ...props }) => (
    <div
      className={getWrapperStyles(props)}
      style={{
          backgroundColor: color || 'inherith',
      }}
      data-test={dataTest}
    >
        {children}
    </div>
)

FullLayout.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    color: PropTypes.string,
    centered: PropTypes.bool,
    dataTest: PropTypes.string,
}

export default FullLayout
