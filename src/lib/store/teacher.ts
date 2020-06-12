import { observable, action, flow, IObservableArray } from 'mobx'

import fetchAPI from 'services/fetchAPI'
import { user } from 'lib/store'
import { ENDPOINT, METHOD } from 'constants/api'

type OArray = IObservableArray<Data.Task>

export default class Teacher {
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
        token: user.access.token
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
      bound: 60,
      check_type: 'task',
      exts: ['.js'],
      groups: subject.groups,
      isCreating: true,
      subjectGroups: subject.groups,
      solutions: [],
      subject_id: subject.id
    }
  }

  @action
  public removeDraftTask = () => {
    this.task = null
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

      oArray.remove(oArray.find(item => item.id === task.id))
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
