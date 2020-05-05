import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'containers/App'

const renderApp = () => {
  render(
    <AppContainer>
      <App count={10} />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp()
