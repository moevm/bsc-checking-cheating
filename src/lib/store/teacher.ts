import { observable, action, flow, autorun, computed, IObservableArray } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

export default class Teacher {
  private id = 1

  @observable public info: Data.Teacher | null = null
  @observable public editableElement: Data.Subject | Data.Task | null = null
  @observable public task: Data.Task | null = null

  @computed
  get noActiveAction() {
    return !this.editableElement
  }

  public fetchTeacherInfo = flow(function* () {
    const self = this as Teacher

    try {
      const response = yield fetchAPI({
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
  public addLocalSubject = () => {
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
    this.editableElement = this.info.subjects[this.info.subjects.length - 1]
  }

  @action
  public removeLocalSubject = () => {
    const array = this.info.subjects as IObservableArray<Data.Subject>

    array.remove(this.editableElement as Data.Subject)
    this.editableElement = null
  }

  @action
  public createSubject = flow(function* (subject: Data.Subject) {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.SUBJECT,
        method: METHOD.POST,
        body: {
          ...subject,
          teacher_id: self.info.id
        }
      })

      self.editableElement = null
      subject.isCreating = false
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public updateSubject = flow(function* () {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.SUBJECT,
        method: METHOD.PATCH,
        body: {
          ...self.editableElement
        }
      })

      self.editableElement.isEditing = false
      self.editableElement = null
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public deleteSubject = flow(function* () {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.SUBJECT,
        method: METHOD.DELETE,
        body: {
          id: self.editableElement.id
        }
      })

      self.removeLocalSubject()
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public toggleSubject = (subject: Data.Subject) => {
    subject.isOpened = !subject.isOpened
  }

  @action
  public editSubject = (subject: Data.Subject) => {
    this.editableElement = subject
    subject.isEditing = true
  }

  @action uneditSubject = () => {
    this.editableElement.isEditing = false
    this.editableElement = null
  }

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
    this.editableElement = subject.tasks[subject.tasks.length - 1]
  }

  public createTask = flow(function* (task: Data.Task, subjectId: number) {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.TASK,
        method: METHOD.POST,
        body: {
          ...task,
          teacher_id: self.info.id,
          subject_id: subjectId
        }
      })

      self.editableElement = null
      task.isCreating = false
    } catch (error) {
      console.error(error)
    }
  })

  public fetchTaskInfo = flow(function* (id: number) {
    const self = this as Teacher

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.TASK,
        path: `/${id}`
      })
      const data = response.data as Data.Task

      self.task = data
    } catch (error) {
      console.error(error)
    }
  })

  public updateTask = flow(function* (task: Data.Task) {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.TASK,
        method: METHOD.PATCH,
        body: task
      })

      self.task = task
    } catch (error) {
      console.error(error)
    }
  })
}
