import { action, flow, observable } from 'mobx'

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
        token: self.user.access.token
      })
      const data = response.data as Data.Admin

      self.info = data
    } catch (error) {
      console.error(error)
    }
  })

  @action.bound
  postTeacher = flow(function* (info: Data.Teacher) {
    const self = this as AdminStore

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.USER,
        method: METHOD.POST,
        token: self.user.access.token,
        body: {
          ...info,
          group_id: null,
          access_type: 'teacher'
        }
      })
      const data = response.data as { id: number }

      self.info.teachers.push({
        ...data,
        email: info.email,
        name: info.name
      })
    } catch (error) {
      console.error(error)
    }
  })

  @action.bound
  postStudent = flow(function* (info: Data.Student) {
    const self = this as AdminStore

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.USER,
        method: METHOD.POST,
        token: self.user.access.token,
        body: {
          ...info,
          access_type: 'student'
        }
      })
      const data = response.data as { id: number }

      self.info.students.push({
        ...data,
        ...info,
        group_number: self.info.groups.find(group => group.id === +info.group_id).number
      })
    } catch (error) {
      console.error(error)
    }
  })

  @action.bound
  postSubject = flow(function* (info: Data.Subject) {
    const self = this as AdminStore

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.SUBJECT,
        method: METHOD.POST,
        token: self.user.access.token,
        body: info
      })
      const data = response.data as { id: number }

      self.info.subjects.push({
        ...data,
        ...info
      })
    } catch (error) {
      console.error(error)
    }
  })

  @action.bound
  postGroup = flow(function* (info: Data.Group) {
    const self = this as AdminStore

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.GROUP,
        method: METHOD.POST,
        token: self.user.access.token,
        body: info
      })
      const data = response.data as { id: number }

      self.info.groups.push({
        ...data,
        ...info
      })
    } catch (error) {
      console.error(error)
    }
  })
}

export default AdminStore
