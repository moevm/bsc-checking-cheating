import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createRouter from 'router5'

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

const startApp = () => {
  const router = createRouter(routes)

  router.start(() => {
    console.log('START Router5')

    renderApp({ router })
  })
}

startApp()
