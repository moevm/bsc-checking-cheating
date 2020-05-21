import { observable, flow, action } from 'mobx'

import fecthAPI from 'services/fetchAPI'
import { ENDPOINT } from 'constants/api'

export default class Student {
  private id = 2

  @observable public info: Data.Student | null = null
  @observable public modalIsOpen: boolean = false

  public fetchStudentInfo = flow(function* () {
    const self = this as Student

    try {
      const respose = yield fecthAPI<Data.Student>({
        endpoint: ENDPOINT.STUDENT_INFO,
        path: `/${this.id}`
      })
      const data = respose.data as Data.Student

      self.info = data
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public openModal = () => {
    this.modalIsOpen = true
  }

  @action closeModal = () => {
    this.modalIsOpen = false
  }
}
