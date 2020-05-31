import React, { PureComponent } from 'react'
import { routeNode } from 'react-router5'
import { SubscribeState, Route } from 'router5'

import compose from 'utils/compose'
import getRouteComponent from 'utils/getRouteComponent'
import Layout from 'containers/Layout'

type TOuterProps = {}
type TRouteNodeProps = SubscribeState
type TProps = TOuterProps & TRouteNodeProps

// TODO: make router service
class Router extends PureComponent<TProps> {
  getSectionRouteComponent(route: Route) {
    return getRouteComponent(route && route.name.split('.')[0])
  }

  render() {
    const { route } = this.props
    const Component = this.getSectionRouteComponent(route)

    return (
      <Layout>
        <Component route={route} />
      </Layout>
    )
  }
}

export default compose(routeNode(''))(Router)
