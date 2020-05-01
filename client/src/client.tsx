import React from 'react'
import { render } from 'react-dom'

import App from 'containers/App'

const renderApp = () => {
    render(<App count={5} />, document.getElementById('root'))
}

renderApp()