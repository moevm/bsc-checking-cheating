import { Router } from 'router5'

import { routes } from 'constants/routes'

export const getRouteComponent = (routeName: string, accessType?: string) => {
  const route = routes.find(route => route.name === routeName)

  if (route) {
    return route.component
  }
}

export const preventNavigation = (router: Router) => (toState, fromState, done) => {
  console.log(toState, fromState)
  done()
}
