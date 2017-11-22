import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigateTo } from 'root/history'

import { show as showModal } from 'Reducers/modals-reducer'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconAdd from 'material-ui/svg-icons/content/add'

import FullLayout from 'Layouts/FullLayout'
import WordsList from 'Components/WordsList'

const mapState = ({ settings, words }) => ({
    title: settings.name,
    words: words.items,
})

const mapDispatch = {
    onDisclose: word => () => navigateTo(`/${word.id}`),
    onAddWord: () => showModal('newWord'),
}

const App = ({ title, words, onDisclose, onAddWord }) => (
    <FullLayout>
        <AppBar
          title={title}
          showMenuIconButton={false}
          iconElementRight={(
              <IconButton
                onClick={onAddWord}
                data-test={'create-word'}
              >
                  <IconAdd />
              </IconButton>
          )}
        />
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
    onAddWord: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(App)
