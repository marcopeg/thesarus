/* eslint import/prefer-default-export:off */

import { push as pushError } from 'Reducers/errors-reducer'

import {
    push as pushSynonym,
    select as selectSynonym,
    dismiss as dismissSynonym,
} from 'Reducers/synonyms-reducer'

const wordDataModel = ({ id }) => ({ id })

export const fetchSynonym = ({ word }) => async (dispatch, getState) => {
    const { settings, synonyms } = getState()

    dispatch(dismissSynonym())

    const cache = synonyms.items
        .filter(item => item.id === word)
        .shift()

    if (cache) {
        dispatch(selectSynonym(cache))
        return
    }

    try {
        const headers = new Headers()
        headers.append('Content-Type', 'application/vnd.api+json')

        const res = await fetch(`${settings.endpoint}/words/${word}`, { headers })
        const body = await res.json()

        if (res.ok) {
            dispatch(pushSynonym({
                id: body.data.id,
                synonyms: body.included.map(wordDataModel),
            }))
        } else {
            dispatch(pushError(res.statusText))
        }
    } catch (e) {
        dispatch(pushError(e.message))
    }
}
