import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { hot } from 'react-hot-loader/root'
import { RouterProvider } from 'react-router5'

import { StoreProvider } from 'lib/contexts/store'
import theme from 'lib/theme'
import Router from 'containers/Router'

export type TOuterProps = {
  router: App.TRouter
}
type TProps = TOuterProps

const App: FC<TProps> = ({ router }) => (
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <Router />
      </RouterProvider>
    </ThemeProvider>
  </StoreProvider>
)

export default hot(App)
