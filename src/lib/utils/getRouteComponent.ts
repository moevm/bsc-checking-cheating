import { routes } from 'constants/routes'

export default function getRouteComponent(routeName: string) {
  const route = routes.find(route => route.name === routeName)

  if (route) {
    return route.component
  }
}
