import { observable, action, computed, flow } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import UserStore from 'lib/store/user'
import { ENDPOINT, METHOD } from 'constants/api'

export default class Student {
  private user: UserStore = null

  @observable public info: Data.Student | null = null
  @observable public choosenTask: Data.Task | null = null
  @observable public uploadedFile: File | null = null

  constructor(user: UserStore) {
    this.user = user
  }

  @computed
  get modalIsOpen() {
    return !!this.choosenTask
  }

  public requestStudentInfo = flow(function* () {
    const self = this as Student

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.STUDENT_INFO,
        token: this.user.access.token
      })
      const data = response.data as Data.Student

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

  @action
  public toggleSubject = (subject: Data.Subject) => {
    subject.isOpened = !subject.isOpened
  }

  public sendSolution = flow(function* () {
    const self = this as Student
    const formData = new FormData()
    formData.append('task_id', self.choosenTask.id.toString())
    formData.append('check_type', self.choosenTask.check_type)
    // formData.append('student_id', self.id.toString())
    formData.append('subject_id', self.choosenTask.subject_id.toString())
    formData.append('solution', self.uploadedFile)

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.SOLUTION,
        method: METHOD.PUT,
        token: self.user.access.token,
        body: formData
      })
      const data = response.data as { originality: string }
      const subject = self.info.subjects.find(item => item.id === self.choosenTask.subject_id)
      const task = subject.tasks.find(item => item.id === self.choosenTask.id)

      task.originality = data.originality
      self.closeModal()
      self.removeFile()
    } catch (error) {
      console.error(error)
    }
  })
}
