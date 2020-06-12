import StudentStore from './student'
import TeacherStore from './teacher'
import UserStore from './user'

const createStore = () => ({
  student: new StudentStore(),
  teacher: new TeacherStore(),
  user: new UserStore()
})

export type Store = ReturnType<typeof createStore>
export default createStore
