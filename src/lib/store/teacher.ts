import { observable, action, flow, autorun } from 'mobx'

import fecthAPI from 'services/fetchAPI'
import { ENDPOINT } from 'constants/api'

export default class Teacher {
  private id = 1
  private counter = 1

  @observable public info: Data.Teacher | null = null

  fetchTeacherInfo = flow(function* () {
    const self = this as Teacher

    try {
      const respose = yield fecthAPI<Data.Student>({
        endpoint: ENDPOINT.TEACHER_INFO,
        path: `/${this.id}`
      })
      console.log(respose)
      const data = respose.data as Data.Teacher

      self.info = data
    } catch (error) {
      console.error(error)
    }
  })

  @action
  addDraftSubject = () => {
    const subject = {
      id: this.counter,
      name: this.counter.toString(),
      tasks: []
    }

    if (this.info.subjects) {
      this.info.subjects.push(subject)
    } else {
      this.info.subjects = [subject]
    }

    this.counter++
  }
}
