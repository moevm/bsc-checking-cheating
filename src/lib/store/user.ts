import { action, flow, observable } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

class User {
  public token: string = null
  @observable public accessType: string = null

  @action
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
    } catch (error) {
      console.error(error)
    }
  })
}

export default User
