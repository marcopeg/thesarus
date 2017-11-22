/* eslint react/prefer-stateless-function:off */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hide as hideModal } from 'Reducers/modals-reducer'
import { addWord } from 'Services/words-service'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'

import Screen from 'Layouts/Screen'
import FullLayout from 'Layouts/FullLayout'

// $FlowFixMe
import styles from './AddWordModal.module.styl'

const mapState = ({ modals }) => ({
    isVisible: modals.newWord,
})

const mapDispatch = {
    onSave: addWord,
    onCancel: () => hideModal('newWord'),
}

class AddWordModal extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
    }

    state = {
        word1: '',
        word2: '',
    }

    onFieldChange = name => event => this.setState({ [name]: event.target.value })

    render () {
        const { isVisible, onSave, onCancel } = this.props
        const { word1, word2 } = this.state

        return (
            <Screen isVisible={isVisible} effect={'slideUp'}>
                <FullLayout>
                    <AppBar
                      title={'Add New Word'}
                      iconElementLeft={(
                          <IconButton
                            onClick={onCancel}
                            data-test={'create-word-cancel'}
                          >
                              <NavigationClose />
                          </IconButton>
                      )}
                      iconElementRight={(
                          <FlatButton
                            label={'save'}
                            onClick={() => onSave(this.state)}
                            data-test={'create-word-submit'}
                          />
                      )}
                    />
                    <div className={styles.body}>
                        <TextField
                          floatingLabelText={'New Word:'}
                          floatingLabelFixed
                          hintText={'type the new word...'}
                          value={word1}
                          onChange={this.onFieldChange('word1')}
                          data-test={'create-word-fld1'}
                        />
                        <TextField
                          floatingLabelText={'Synonym:'}
                          floatingLabelFixed
                          hintText={'type a synonym to this word...'}
                          value={word2}
                          onChange={this.onFieldChange('word2')}
                          data-test={'create-word-fld2'}
                        />
                    </div>
                </FullLayout>
            </Screen>
        )
    }
}

export default connect(mapState, mapDispatch)(AddWordModal)
