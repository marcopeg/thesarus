/* eslint react/no-children-prop:off */

import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import FullLayout from 'Layouts/FullLayout'
import Screen from 'Layouts/Screen'

import HomePage from 'Routes/HomePage'
import WordPage from 'Routes/WordPage'
import AddWordModal from 'Containers/AddWordModal'
import ErrorModal from 'Containers/ErrorModal'

const App = () => (
    <FullLayout>
        <HomePage />
        <Route
          path={'/:word'}
          children={({ match }) => (
              <Screen isVisible={match !== null}>
                  <WordPage />
              </Screen>
          )}
        />
        <AddWordModal />
        <ErrorModal />
    </FullLayout>
)

export default withRouter(App)
