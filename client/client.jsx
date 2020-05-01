import { render } from 'react-dom'

import App from 'src/containers/App'

const renderApp = () => {
    render(App, document.getElementById('root'))
}

renderApp()