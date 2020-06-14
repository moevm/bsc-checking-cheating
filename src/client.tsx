import React from 'react'
import 'mobx-react/batchingForReactDom'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

// import { preventNavigation } from 'utils/router'
import App, { TOuterProps } from 'containers/App'
import { routes } from 'constants/routes'

type AppProps = TOuterProps

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

  router.usePlugin(browserPlugin())
  // router.useMiddleware(preventNavigation)
  router.start(() => {
    console.log('START Router5')

    renderApp({ router })
  })
}

startApp()
