import { flow, observable } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import UserStore from 'lib/store/user'
import { ENDPOINT, METHOD } from 'constants/api'

class AdminStore {
  private user: UserStore = null
  @observable public info: Data.Admin = null

  constructor(user: UserStore) {
    this.user = user
  }

  requestInfo = flow(function* () {
    const self = this as AdminStore

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.ADMIN,
        token: this.user.access.token
      })
      const data = response.data as Data.Admin

      this.info = data
    } catch (error) {
      console.error(error)
    }
  })
}

export default AdminStore
