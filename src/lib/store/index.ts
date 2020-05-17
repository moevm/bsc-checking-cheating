import StudentStore from './student'

const createStore = () => ({
  student: new StudentStore()
})

export type Store = ReturnType<typeof createStore>
export default createStore
