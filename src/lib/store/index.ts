import { Router } from 'router5'

import StudentStore from './student'
import TeacherStore from './teacher'
import UserStore from './user'

class RootStore {
  private student: StudentStore = null
  private teacher: TeacherStore = null
  public static user: UserStore = null

  constructor(router: Router) {
    this.student = new StudentStore()
    this.teacher = new TeacherStore()
    RootStore.user = new UserStore(router)
  }

  get stores() {
    return {
      student: this.student,
      teacher: this.teacher,
      user: RootStore.user
    }
  }
}

// const createStore = (router: Router) => {
//   user.addRouter(router)

//   return {
//     student,
//     teacher,
//     user
//   }
// }

// export type Store = ReturnType<typeof createStore>
// export default createStore
export default RootStore
