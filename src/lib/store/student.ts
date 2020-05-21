import { observable, action, computed, flow } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

export default class Student {
  private id = 2

  @observable public info: Data.Student | null = null
  @observable public choosenTask: Data.Task | null = null
  @observable public uploadedFile: File | null = null

  @computed
  get modalIsOpen() {
    return !!this.choosenTask
  }

  public fetchStudentInfo = flow(function* () {
    const self = this as Student

    try {
      const respose = yield fetchAPI({
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
  public openModal = (task: Data.Task) => {
    this.choosenTask = task
  }

  @action closeModal = () => {
    this.choosenTask = null
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
    const formData = new FormData()
    formData.append('task_id', self.choosenTask.id.toString())
    formData.append('student_id', self.id.toString())
    formData.append('subject_id', self.choosenTask.subjectId.toString())
    formData.append('solution', self.uploadedFile)

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.SOLUTION,
        method: METHOD.POST,
        body: formData
      })

      self.closeModal()
      self.removeFile()
    } catch (error) {
      console.error(error)
    }
  })
}
