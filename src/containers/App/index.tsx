import React from 'react'
import { hot } from 'react-hot-loader/root'
import { RouterProvider } from 'react-router5'

import Router from 'containers/Router'

type TOuterProps = {
  router: App.TRouter
}
type TProps = TOuterProps

const App = ({ router }: TProps) => (
  <RouterProvider router={router}>
    <Router />
  </RouterProvider>
)

export default hot(App)
