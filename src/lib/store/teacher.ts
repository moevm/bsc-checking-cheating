import { observable, action, flow, autorun } from 'mobx'

import fecthAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

export default class Teacher {
  private id = 1

  @observable public info: Data.Teacher | null = null
  @observable public subjectIsCreating: boolean = false
  @observable public taskIsCreating: boolean = false

  public fetchTeacherInfo = flow(function* () {
    const self = this as Teacher

    try {
      const response = yield fecthAPI({
        endpoint: ENDPOINT.TEACHER_INFO,
        path: `/${this.id}`
      })
      const data = response.data as Data.Teacher

      self.info = data
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public changeObject = (object: Data.Subject | Data.Task, property: string, text: string) => {
    if (object[property] instanceof Array) {
      object[property] = text.split(',')
    } else {
      object[property] = text
    }
  }

  @action
  public addDraftSubject = () => {
    const subject = {
      name: '',
      groups: [],
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
        endpoint: ENDPOINT.SUBJECT,
        method: METHOD.POST,
        body: {
          ...subject,
          teacher_id: self.info.id
        }
      })

      self.subjectIsCreating = false
      subject.isCreating = false
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public addDraftTask = (subject: Data.Subject) => {
    const task = {
      name: '',
      exts: [],
      groups: subject.groups,
      isCreating: true
    }

    if (subject.tasks) {
      subject.tasks.push(task)
    } else {
      subject.tasks = [task]
    }
    this.taskIsCreating = true
  }

  public createTask = flow(function* (task: Data.Task, subjectId: number) {
    const self = this as Teacher

    try {
      yield fecthAPI({
        endpoint: ENDPOINT.TASK,
        method: METHOD.POST,
        body: {
          ...task,
          teacher_id: self.info.id,
          subject_id: subjectId
        }
      })

      self.taskIsCreating = false
      task.isCreating = false
    } catch (error) {
      console.error(error)
    }
  })

  public getSolutionsByTask = flow(function* (task: Data.Task) {
    const self = this as Teacher

    try {
      const response = yield fecthAPI({
        endpoint: ENDPOINT.SOLUTIONS,
        path: `/${task.id}`
      })
      const data = response.data as Data.Solution[]

      task.solutions = data
    } catch (error) {
      console.error(error)
    }
  })
}
