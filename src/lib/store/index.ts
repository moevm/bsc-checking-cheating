import StudentStore from './student'
import TeacherStore from './teacher'

const createStore = () => ({
  student: new StudentStore(),
  teacher: new TeacherStore()
})

export type Store = ReturnType<typeof createStore>
export default createStore
