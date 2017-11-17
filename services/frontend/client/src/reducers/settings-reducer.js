// @flow

export const initialState: SettingsState = {
    name: 'react-app',
    endpoint: '/api/v1',
}

/**
 * Actions
 */

/**
 * Handlers
 */

export const actionHandlers = {}

export const reducer = (state: SettingsState = initialState, action: ReduxAction) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer
