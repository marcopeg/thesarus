import React from 'react'
import PropTypes from 'prop-types'

import { List } from 'material-ui/List'
import FullLayout from 'Layouts/FullLayout'
import WordCard from './WordCard'

const WordsList = ({ items, onDisclose }) => (
    <FullLayout
      scrollable
      dataTest={'words-list'}
    >
        <List>
            {items.map(item => (
                <WordCard
                  {...item}
                  key={item.id}
                  onClick={() => onDisclose(item)}
                />
            ))}
        </List>
    </FullLayout>
)

const wordShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
})

WordsList.propTypes = {
    items: PropTypes.arrayOf(wordShape).isRequired,
    onDisclose: PropTypes.func.isRequired,
}

export default WordsList
