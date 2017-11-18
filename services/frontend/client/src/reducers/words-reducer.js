// @flow

export const initialState: WordsState = {
    items: [],
}

/**
 * Actions
 */

export const SET: string = 'set@words'

export const set = (words: Array<Word>) => ({
    type: SET,
    payload: words,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET]: (state: WordsState, action: ReduxAction) => ({
        ...state,
        items: [ ...action.payload ],
    }),
}

export const reducer = (state: WordsState = initialState, action: ReduxAction) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
