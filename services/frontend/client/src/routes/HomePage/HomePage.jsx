import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigateTo } from 'root/history'

import FullLayout from 'Layouts/FullLayout'
import Toolbar from 'Components/Toolbar'
import WordsList from 'Components/WordsList'

const mapState = ({ settings, words }) => ({
    title: settings.name,
    words: words.items,
})

const mapDispatch = {
    onDisclose: word => () => navigateTo(`/${word.id}`),
}

const App = ({ title, words, onDisclose }) => (
    <FullLayout>
        <Toolbar title={title} />
        <WordsList
          items={words}
          onDisclose={onDisclose}
        />
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

export default connect(mapState, mapDispatch)(App)
