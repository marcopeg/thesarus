// @flow

export const initialState: ModalsState = {
    newWord: false,
}

/**
 * Actions
 */

export const SHOW: string = 'show@modal'
export const HIDE: string = 'hide@modal'

export const show = (name: ModalName) => ({
    type: SHOW,
    payload: name,
})

export const hide = (name: ModalName) => ({
    type: HIDE,
    payload: name,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SHOW]: (state: ModalsState, action: ReduxAction) => ({
        ...state,
        [action.payload]: true,
    }),
    [HIDE]: (state: ModalsState, action: ReduxAction) => ({
        ...state,
        [action.payload]: false,
    }),
}

export const reducer = (state: ModalsState = initialState, action: ReduxAction) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
