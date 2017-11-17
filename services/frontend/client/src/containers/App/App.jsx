import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Layout from 'Layouts/DefaultLayout'

const mapState = ({ settings }) => ({
    appName: settings.name,
})

const mapDispatch = {}

const App = ({ appName }) => (
    <Layout>
        {appName}
    </Layout>
)

App.propTypes = {
    appName: PropTypes.string.isRequired,
}

export default withRouter(connect(mapState, mapDispatch)(App))
