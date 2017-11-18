// @flow

export const initialState: ErrorsState = {
    items: [],
    show: null,
}

/**
 * Actions
 */

export const PUSH: string = 'push@errors'
export const DISMISS: string = 'dismiss@errors'

export const push = (message: string) => ({
    type: PUSH,
    payload: {
        date: new Date(),
        message,
    },
})

export const dismiss = () => ({
    type: DISMISS,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [PUSH]: (state: ErrorsState, action: ReduxAction) => ({
        show: action.payload,
        items: [ ...state.items, action.payload ],
    }),
    [DISMISS]: (state: ErrorsState) => ({
        ...state,
        show: null,
    }),
}

export const reducer = (state: ErrorsState = initialState, action: ReduxAction) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
