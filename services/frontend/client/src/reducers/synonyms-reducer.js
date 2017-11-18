// @flow

export const initialState: SynonymsState = {
    items: [],
    show: null,
}

/**
 * Actions
 */

export const PUSH: string = 'push@synonyms'
export const SELECT: string = 'select@synonyms'
export const DISMISS: string = 'dismiss@synonyms'

export const push = (synonym: Synonym) => ({
    type: PUSH,
    payload: synonym,
})

export const select = (synonym: Synonym) => ({
    type: SELECT,
    payload: synonym,
})

export const dismiss = () => ({
    type: DISMISS,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [PUSH]: (state: SynonymsState, action: ReduxAction) => ({
        show: action.payload,
        items: [ ...state.items, action.payload ],
    }),
    [SELECT]: (state: SynonymsState, action: ReduxAction) => ({
        ...state,
        show: action.payload,
    }),
    [DISMISS]: (state: SynonymsState) => ({
        ...state,
        show: null,
    }),
}

export const reducer = (state: SynonymsState = initialState, action: ReduxAction) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
