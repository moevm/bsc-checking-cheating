import { action, flow, observable } from 'mobx'
import { State, Router } from 'router5'

import { getRouteByName } from 'utils/router'
import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

class User {
  private router: Router
  public token: string = null
  public accessType: string = null

  public requestAuth = flow(function* (login) {
    const self = this as User

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.AUTH,
        method: METHOD.POST,
        body: login
      })
      const data = response.data as { token: string; access_type: string }

      self.accessType = data.access_type
      self.token = data.token
      self.router.navigate(self.accessType)
    } catch (error) {
      console.error(error)
    }
  })

  public addRouter = (router: Router) => {
    this.router = router
  }

  public checkAuthorization = (nextState: State, done: () => void) => {
    const route = getRouteByName(nextState.name)

    if (!route.accessType || route.accessType === this.accessType) {
      done()
    } else {
      this.router.navigate('auth')
    }
  }
}

export default User
