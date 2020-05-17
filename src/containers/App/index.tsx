import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { hot } from 'react-hot-loader/root'
import { RouterProvider } from 'react-router5'

import { theme } from 'lib/theme'
import Router from 'containers/Router'

export type TOuterProps = {
  router: App.TRouter
}
type TProps = TOuterProps

const App: FC<TProps> = ({ router }) => (
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}>
      <Router />
    </RouterProvider>
  </ThemeProvider>
)

export default hot(App)
