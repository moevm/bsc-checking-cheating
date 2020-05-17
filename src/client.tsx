import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import App from 'containers/App'
import { routes } from 'constants/routes'

type AppProps = {
  router: App.TRouter
}

const renderApp = ({ ...config }: AppProps) => {
  render(
    <AppContainer>
      <App {...config} />
    </AppContainer>,
    document.getElementById('root')
  )
}

// TODO add router browser plugin
const startApp = () => {
  const router = createRouter(routes)

  router.usePlugin(browserPlugin())

  router.start(() => {
    console.log('START Router5')

    renderApp({ router })
  })
}

startApp()
