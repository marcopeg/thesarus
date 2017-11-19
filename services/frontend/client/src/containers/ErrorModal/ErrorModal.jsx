import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { dismiss as dismissModal } from 'Reducers/errors-reducer'

// import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
// import IconButton from 'material-ui/IconButton'
// import NavigationClose from 'material-ui/svg-icons/navigation/close'
// import TextField from 'material-ui/TextField'

import Screen from 'Layouts/Screen'
import FullLayout from 'Layouts/FullLayout'

// $FlowFixMe
import styles from './ErrorModal.module.styl'

const mapState = ({ errors }) => ({
    isVisible: errors.show !== null,
    errorMessage: errors.show !== null ? errors.show.message : '',
})

const mapDispatch = {
    onDismiss: dismissModal,
}

const ErrorModal = ({ isVisible, onDismiss, errorMessage }) => (
    <Screen
      isVisible={isVisible}
      effect={'none'}
      color={'rgba(150, 150, 150, 0.5)'}
    >
        <FullLayout centered>
            <div className={styles.wrapper}>
                <div className={styles.message}>{errorMessage}</div>
                <div className={styles.actions}>
                    <RaisedButton
                      primary
                      label={'Ok'}
                      onClick={onDismiss}
                    />
                </div>
            </div>
        </FullLayout>
    </Screen>
)

ErrorModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
}

export default connect(mapState, mapDispatch)(ErrorModal)
