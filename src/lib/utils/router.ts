// import { user } from 'lib/store'
import { routes } from 'constants/routes'

export const getRouteByName = (routeName: string) => {
  const route = routes.find(route => route.name === routeName)

  return route || null
}

export const getRouteComponent = (routeName: string) => {
  const route = getRouteByName(routeName)

  if (route) {
    return route.component
  }
}

// export const preventNavigation = () => (toState, fromState, done) => {
//   user.checkAuthorization(toState, done)

//   return undefined
// }
