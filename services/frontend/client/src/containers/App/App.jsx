import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { navigateTo } from 'root/history'

import FullLayout from 'Layouts/FullLayout'
import Toolbar from 'Components/Toolbar'
import WordsList from 'Components/WordsList'

// $FlowFixMe
import styles from './App.module.styl'

const mapState = ({ settings, words }) => ({
    title: settings.name,
    words: words.items,
})

const mapDispatch = {
    onDisclose: word => () => navigateTo(`/${word.id}`),
}

const App = ({ title, words, onDisclose }) => (
    <FullLayout>
        <div className={styles.toolbar}>
            <Toolbar title={title} />
        </div>
        <div className={styles.body}>
            <WordsList
              items={words}
              onDisclose={onDisclose}
            />
        </div>
    </FullLayout>
)

const wordShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
})

App.propTypes = {
    title: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(wordShape).isRequired,
    onDisclose: PropTypes.func.isRequired,
}

export default withRouter(connect(mapState, mapDispatch)(App))
