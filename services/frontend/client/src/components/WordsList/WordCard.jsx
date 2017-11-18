import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'material-ui/List'
import IconOpen from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const WordCard = ({ id, onClick }) => (
    <ListItem
      primaryText={id}
      rightIcon={<IconOpen />}
      onClick={onClick}
    />
)

WordCard.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default WordCard
