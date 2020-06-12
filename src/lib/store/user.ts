import { observable, action, computed, flow } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

class User {
  @observable token: string = null

  @action
  public requestAuth = flow(function* (login) {
    const self = this as User

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.AUTH,
        method: METHOD.POST,
        body: login
      })
      const data = response.data

      self.token = data
    } catch (error) {
      console.error(error)
    }
  })
}

export default User
