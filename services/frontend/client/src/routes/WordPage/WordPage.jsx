import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigateTo } from 'root/history'

import FullLayout from 'Layouts/FullLayout'
import Toolbar from 'Components/Toolbar'

const mapState = ({ synonyms }) => ({
    title: synonyms.show
        ? synonyms.show.id
        : 'loading...',
})

const mapDispatch = {
    closePage: () => () => navigateTo('/'),
}

const WordPage = ({ title, closePage }) => (
    <FullLayout>
        <Toolbar
          title={title}
          backBtn={closePage}
        />
        <FullLayout scrollable>
            {title}
        </FullLayout>
    </FullLayout>
)

WordPage.propTypes = {
    title: PropTypes.string.isRequired,
    closePage: PropTypes.func.isRequired,
}

export default connect(mapState, mapDispatch)(WordPage)
