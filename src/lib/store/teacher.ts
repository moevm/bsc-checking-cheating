import { observable, action, flow, autorun, computed, toJS, IObservableArray } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import { ENDPOINT, METHOD } from 'constants/api'

type OArray = IObservableArray<Data.Task>

export default class Teacher {
  private id = 1

  @observable public info: Data.Teacher | null = null
  @observable public modal: Data.Difference | null = null
  @observable public task: Data.Task | null = null
  @observable public isLoading: boolean = false

  public findSubjectById = (id: number) => this.info.subjects.find(subject => subject.id === id)

  public findTaskWithParentById = (
    id: number | string
  ): { subject: Data.Subject; task: Data.Task } => {
    for (let subject of this.info.subjects) {
      const task = subject.tasks.find(task => task.id === id)

      if (task) {
        return {
          subject,
          task
        }
      }
    }
  }

  public requestTeacherInfo = flow(function* () {
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
    this.task = {
      id: 'new',
      name: 'Новое задание',
      subject_id: subject.id,
      exts: [],
      groups: subject.groups,
      solutions: [],
      isCreating: true
    }

    // if (subject.tasks) {
    //   subject.tasks.push(task)
    // } else {
    //   subject.tasks = [task]
    // }
  }

  @action
  public removeDraftTask = () => {
    this.task = null
    // const result = this.findTaskWithParentById(0)
    // const oArray = result.subject.tasks as IObservableArray<Data.Task>

    // oArray.remove(result.task)
  }

  @action
  public changeTask = (newTask: Data.Task) => {
    const subject = this.findSubjectById(newTask.subject_id)
    const index = subject.tasks.findIndex(task => task.id === newTask.id)

    subject.tasks[index] = newTask
  }

  public requestTaskInfo = flow(function* (id: number) {
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

  public createTask = flow(function* (newTask: Data.Task) {
    const self = this as Teacher

    try {
      const response = yield fetchAPI({
        endpoint: ENDPOINT.TASK,
        method: METHOD.POST,
        body: {
          ...newTask,
          teacherId: self.info.id
        }
      })
      const data = response.data as { id: number }

      const subject = self.findSubjectById(newTask.subject_id)
      subject.tasks.push({
        ...newTask,
        id: data.id
      })
    } catch (error) {
      console.error(error)
    }
  })

  public deleteTask = flow(function* (task: Data.Task) {
    const self = this as Teacher

    try {
      yield fetchAPI({
        endpoint: ENDPOINT.TASK,
        method: METHOD.DELETE,
        path: `/${task.id}`
      })

      const subject = self.findSubjectById(task.subject_id)
      const oArray = subject.tasks as OArray

      oArray.remove(task)
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

      self.changeTask(task)
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
