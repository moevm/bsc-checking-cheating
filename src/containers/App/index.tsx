import React from 'react'
import { hot } from 'react-hot-loader/root'

import Layout from 'containers/Layout'
import Button from 'components/Button'

type TOuterProps = {
  count: number
}
type TProps = TOuterProps

const App = ({ count }: TProps) => (
  <Layout>
    <p>Test {count}</p>
    <Button title="students" />
  </Layout>
)

export default hot(App)
