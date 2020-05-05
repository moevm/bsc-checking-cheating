import React from 'react'
import { hot } from 'react-hot-loader/root'

import Layout from 'containers/Layout'

type TOuterProps = {
    count: number
}
type TProps = TOuterProps

const App = ({ count }: TProps) => <Layout><p>Test {count}</p>
</Layout>

export default hot(App)