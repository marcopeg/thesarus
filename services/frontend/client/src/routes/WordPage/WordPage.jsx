import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigateTo } from 'root/history'

import FullLayout from 'Layouts/FullLayout'
import Toolbar from 'Components/Toolbar'
import WordsList from 'Components/WordsList'

const mapState = ({ synonyms }) => ({
    title: synonyms.show
        ? synonyms.show.id
        : 'loading...',
    synonyms: synonyms.show
        ? synonyms.show.synonyms
        : [],
})

const mapDispatch = {
    onDisclose: word => () => navigateTo(`/${word.id}`),
    closePage: () => () => navigateTo('/'),
}

const WordPage = ({ title, synonyms, onDisclose, closePage }) => (
    <FullLayout>
        <Toolbar
          title={title}
          backBtn={closePage}
        />
        <FullLayout>
            <h6 style={{ margin: '25px 15px', marginBottom: 0 }}>List of synonyms:</h6>
            <WordsList
              items={synonyms}
              onDisclose={onDisclose}
            />
        </FullLayout>
    </FullLayout>
)

const synonymShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
})

WordPage.propTypes = {
    title: PropTypes.string.isRequired,
    synonyms: PropTypes.arrayOf(synonymShape).isRequired,
    onDisclose: PropTypes.func.isRequired,
    closePage: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(WordPage)
