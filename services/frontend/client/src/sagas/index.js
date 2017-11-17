/* eslint global-require: off */

const sagas = []

export const configSagas = (reduxSaga) => {
    sagas.map(saga => reduxSaga.run(saga.default))
}

// needed by the injector package
// (https://github.com/GuillaumeCisco/redux-sagas-injector)
export function* rootSaga () {} // eslint-disable-line

export default configSagas
