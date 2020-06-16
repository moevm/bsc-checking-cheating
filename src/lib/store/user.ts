import { flow } from 'mobx'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { Router, State } from 'router5'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

class UserStore {
  private router: Router
  public cookies: { [key: string]: string } = null
  public access: { type: string; token: string } = null

  constructor(router: Router) {
    this.router = router
    // this.router.useMiddleware(this.routerMiddleware)

    const cookies = parseCookies()

    if (cookies.access) {
      this.access = JSON.parse(cookies.access)

      this.router.navigate(this.access.type)
    } else {
      this.router.navigate('auth')
    }
  }

  get isAuthorized() {
    return !!this.access
  }

  public logIn = flow(function* (login) {
    const self = this as UserStore

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.AUTH,
        method: METHOD.POST,
        body: login
      })
      const data = response.data as { token: string; type: string }

      self.access = data
      setCookie(null, 'access', JSON.stringify(self.access), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      self.router.navigate(self.access.type)
    } catch (error) {
      console.error(error)
    }
  })

  public logOut = () => {
    destroyCookie(null, 'access', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    this.access = null
    this.router.navigate('auth')
  }

  // public routerMiddleware = () => (toState: State, fromState: State, done: () => void) => {
  //   const pageName = toState.name.replace(/\.\S+/, '')

  //   if (this.access) {
  //     if (this.access.type === pageName) {
  //       done()
  //     } else {
  //       this.router.navigate(this.access.type)
  //     }
  //   } else {
  //     this.router.navigate('auth')
  //   }
  // }
}

export default UserStore
