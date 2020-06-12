import React, { PureComponent } from 'react'
import { routeNode } from 'react-router5'
import { Route } from 'router5'

import compose from 'utils/compose'
import { getRouteComponent } from 'utils/router'
import Layout from 'containers/Layout'

type TOuterProps = {
  router: App.TRouter
}
type TRouteNodeProps = App.TInjectedRouteProps
type TProps = TOuterProps & TRouteNodeProps

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
