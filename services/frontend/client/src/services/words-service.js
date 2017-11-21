
import { set as setWords } from 'Reducers/words-reducer'
import { push as pushError } from 'Reducers/errors-reducer'
import { hide as hideModal } from 'Reducers/modals-reducer'

const wordDataModel = ({ id }) => ({ id })

export const fetchWords = () => async (dispatch, getState) => {
    const { settings } = getState()

    try {
        const headers = new Headers()
        headers.append('Content-Type', 'application/vnd.api+json')

        const res = await fetch(`${settings.endpoint}/graph`, { headers })
        const body = await res.json()

        if (res.ok) {
            dispatch(setWords(body.data.map(wordDataModel)))
        } else {
            dispatch(pushError(res.statusText))
        }
    } catch (e) {
        dispatch(pushError(e.message))
    }
}

export const addWord = ({ word1, word2 }) => async (dispatch, getState) => {
    const { settings } = getState()

    try {
        const headers = new Headers()
        headers.append('Content-Type', 'application/vnd.api+json')

        const res = await fetch(`${settings.endpoint}/graph`, {
            headers,
            method: 'POST',
            body: JSON.stringify({
                entities: [
                    { id: word1, type: 'word', title: word1 },
                    { id: word2, type: 'word', title: word2 },
                ],
            }),
        })

        if (res.ok) {
            dispatch(fetchWords())
            dispatch(hideModal('newWord'))
        } else {
            dispatch(pushError(res.statusText))
        }
    } catch (e) {
        dispatch(pushError(e.message))
    }
}

export const start = async (dispatch) => {
    dispatch(fetchWords())
}
