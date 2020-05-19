import { observable, action, flow, autorun } from 'mobx'

import fecthAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

export default class Teacher {
  private id = 1
  private counter = 1

  @observable public info: Data.Teacher | null = null
  @observable public subjectIsCreating: boolean = false

  public fetchTeacherInfo = flow(function* () {
    const self = this as Teacher

    try {
      const respose = yield fecthAPI({
        endpoint: ENDPOINT.TEACHER_INFO,
        path: `/${this.id}`
      })
      const data = respose.data as Data.Teacher

      self.info = data
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public addDraftSubject = () => {
    const subject = {
      id: this.counter,
      name: this.counter.toString(),
      groups: [6382, 6383],
      tasks: [],
      isCreating: true
    }

    if (this.info.subjects) {
      this.info.subjects.push(subject)
    } else {
      this.info.subjects = [subject]
    }
    this.subjectIsCreating = true
  }

  @action
  public createSubject = flow(function* (subject: Data.Subject) {
    const self = this as Teacher

    try {
      yield fecthAPI({
        endpoint: ENDPOINT.CREATE_SUBJECT,
        method: METHOD.POST,
        body: {
          name: subject.name,
          teacher_id: self.info.id,
          groups: subject.groups
        }
      })

      this.subjectIsCreating = false
      subject.isCreating = false
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public changeSubject = (subject: Data.Subject, property: string, text: string) => {
    if (subject[property] instanceof Array) {
      subject[property] = text.split(',')
    } else {
      subject[property] = text
    }
  }
}
