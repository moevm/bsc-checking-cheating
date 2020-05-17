import React, { PureComponent } from 'react'
import { routeNode } from 'react-router5'
import { SubscribeState } from 'router5'

import compose from 'utils/compose'
import Layout from 'containers/Layout'
import StudentPage from 'pages/Student'

type TOuterProps = {}
type TRouteNodeProps = SubscribeState
type TProps = TOuterProps & TRouteNodeProps

class Router extends PureComponent<TProps> {
  render() {
    const { route } = this.props
    const Component = () => (route && route.name === 'student' ? <StudentPage /> : <div>Test</div>)

    return (
      <Layout>
        <Component />
      </Layout>
    )
  }
}

export default compose(routeNode(''))(Router)
