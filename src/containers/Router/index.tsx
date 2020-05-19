import React, { PureComponent } from 'react'
import { routeNode } from 'react-router5'
import { SubscribeState } from 'router5'

import compose from 'utils/compose'
import Layout from 'containers/Layout'
import StudentPage from 'pages/Student'
import TeacherPage from 'pages/Teacher'

type TOuterProps = {}
type TRouteNodeProps = SubscribeState
type TProps = TOuterProps & TRouteNodeProps

// TODO: make router service
class Router extends PureComponent<TProps> {
  getComponent(routeName: string) {
    switch (routeName) {
      case 'student':
        return StudentPage
      case 'teacher':
        return TeacherPage
      default:
        return () => <div>No page for this route</div>
    }
  }

  render() {
    const { route } = this.props
    const Component = this.getComponent(route && route.name)

    return (
      <Layout>
        <Component />
      </Layout>
    )
  }
}

export default compose(routeNode(''))(Router)
