import { Router } from 'router5'

import StudentStore from './student'
import TeacherStore from './teacher'
import UserStore from './user'

export const student = new StudentStore()
export const teacher = new TeacherStore()
export const user = new UserStore()

const createStore = (router: Router) => {
  user.addRouter(router)

  return {
    student,
    teacher,
    user
  }
}

export type Store = ReturnType<typeof createStore>
export default createStore
