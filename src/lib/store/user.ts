import { action, flow, observable } from 'mobx'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { State, Router } from 'router5'

import { getRouteByName } from 'utils/router'
import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

class User {
  private router: Router
  public cookies: { [key: string]: string } = null
  public access: { type: string; token: string } = {
    token: null,
    type: null
  }

  constructor(router: Router) {
    this.router = router
    const cookies = parseCookies()

    if (cookies.access) {
      this.access = JSON.parse(cookies.access)

      this.router.navigate(this.access.type)
    }
  }

  // public addRouter = (router: Router) => {
  //   this.router = router
  // }

  public logIn = flow(function* (login) {
    const self = this as User

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.AUTH,
        method: METHOD.POST,
        body: login
      })
      const data = response.data as { token: string; type: string }

      self.access = data
      setCookie(null, 'access', JSON.stringify(self.access), {
        maxAge: 24 * 60 * 60,
        path: '/'
      })
      self.router.navigate(self.access.type)
    } catch (error) {
      console.error(error)
    }
  })

  public logOut = () => {
    destroyCookie(null, 'token')

    this.router.navigate('auth')
  }

  // public checkAuthorization = (nextState: State, done: () => void) => {
  //   const route = getRouteByName(nextState.name)

  //   if ((!route.accessType && !this.access.type) || route.accessType === this.access.type) {
  //     done()
  //   } else {
  //     this.router.navigate(this.access.type)
  //   }
  // }
}

export default User
