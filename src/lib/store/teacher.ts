import { observable, action, flow, autorun, computed, IObservableArray } from 'mobx'
import { nanoid } from 'nanoid'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

export default class Teacher {
  private id = 1

  @observable public info: Data.Teacher | null = null
  @observable public editableElement: Data.Subject | Data.Task | null = null
  @observable public task: Data.Task | null = null
  @observable public modal: Data.Difference | null = null

  @computed
  get noActiveAction() {
    return !this.editableElement
  }

  private findSubjectById = (id: number) => this.info.subjects.find(subject => subject.id === id)

  public getTeacherInfo = flow(function* () {
    const self = this as Teacher

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.TEACHER_INFO,
        path: `/${this.id}`
      })
      const data = response.data as Data.Teacher

      self.info = data
    } catch (error) {
      console.log(error)
    }
  })

  @action
  public toggleSubject = (subject: Data.Subject) => {
    subject.isOpened = !subject.isOpened
  }

  @action
  public addDraftTask = (subject: Data.Subject) => {
    const task = {
      id: nanoid(),
      subjectId: subject.id,
      name: 'Новое задание',
      exts: [],
      groups: subject.groups,
      solutions: [],
      isCreating: true
    }

    if (subject.tasks) {
      subject.tasks.push(task)
    } else {
      subject.tasks = [task]
    }
    this.task = subject.tasks[subject.tasks.length - 1]
    return this.task.id
  }

  @action
  public removeDraftTask = () => {
    const subjectId = this.task.subjectId
    const subject = this.info.subjects.find(subject => subject.id === subjectId)
    const tasks = subject.tasks as IObservableArray<Data.Task>

    tasks.remove(this.task)
  }

  public createTask = flow(function* (newTask: Data.Task) {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.TASK,
        method: METHOD.POST,
        body: {
          ...newTask,
          teacherId: self.info.id
        }
      })

      const subject = self.info.subjects.find(subject => subject.id === newTask.subjectId)
      const task = subject.tasks.find(task => (task.id = newTask.id))
      task.isCreating = false
      self.task = task
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

  public fetchStudentSolution = flow(function* (solution: Data.Solution) {
    const self = this as Teacher

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.SOLUTION,
        params: solution
      })
      const data = response.data as Data.Difference

      self.modal = response.data
    } catch (error) {
      console.error(error)
    }
  })

  @action
  public closeModal = () => {
    this.modal = null
  }
}
