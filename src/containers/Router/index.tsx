import React, { PureComponent } from 'react'
import { routeNode } from 'react-router5'
import { SubscribeState } from 'router5'

import compose from 'utils/compose'
import Layout from 'containers/Layout'

type TOuterProps = {}
type TRouteNodeProps = SubscribeState
type TProps = TOuterProps & TRouteNodeProps
type TState = {}

class Router extends PureComponent<TProps, TState> {
  render() {
    const Component = () => <div>Test</div>
    const { route } = this.props
    console.log(route)

    return (
      <Layout>
        <Component />
      </Layout>
    )
  }
}

export default compose(routeNode(''))(Router)
