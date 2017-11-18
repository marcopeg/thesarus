import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import FullLayout from 'Layouts/FullLayout'
import Toolbar from 'Components/Toolbar'

// $FlowFixMe
import styles from './App.module.styl'

const mapState = ({ settings }) => ({
    appName: settings.name,
})

const mapDispatch = {}

const App = ({ appName }) => (
    <FullLayout>
        <div className={styles.toolbar}>
            <Toolbar title={appName} />
        </div>
        <div className={styles.body}>
            {'body...'}
        </div>
    </FullLayout>
)

App.propTypes = {
    appName: PropTypes.string.isRequired,
}

export default withRouter(connect(mapState, mapDispatch)(App))
