import React, { FC, memo } from 'react'
import { withRoute } from 'react-router5'
import { SubscribeState } from 'router5'

import getRouteComponent from 'utils/getRouteComponent'

type TOuterProps = SubscribeState & {
  routeName: string
}
type TProps = TOuterProps

const Route: FC<TProps> = memo(({ routeName, route, ...props }) => {
  if (routeName === route.name) {
    const Component = getRouteComponent(routeName)

    return <Component route={route} {...props} />
  }

  return null
})

export default withRoute(Route)
