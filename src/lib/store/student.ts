import { observable, action, computed, flow } from 'mobx'

import fecthAPI from 'services/fetchAPI'
import { ENDPOINT } from 'constants/api'

export default class Student {
  private id = 2

  @observable public info: Data.Student | null = null
  @observable public taskId: number | null = null
  @observable public uploadedFile: File | null = null

  @computed
  get modalIsOpen() {
    return !!this.taskId
  }

  public fetchStudentInfo = flow(function* () {
    const self = this as Student

    try {
      const respose = yield fecthAPI({
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
  public openModal = (id: number) => {
    this.taskId = id
  }

  @action closeModal = () => {
    this.taskId = null
  }

  @action
  public addFile = (file: File) => {
    this.uploadedFile = file
  }

  @action
  public removeFile = () => {
    this.uploadedFile = null
  }

  public sendSolution = flow(function* () {
    const self = this as Student

    //   try {
    //     yield fetchAPI({
    //       endpoint:
    //     })
    //   }
  })
}
