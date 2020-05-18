import { observable, flow } from 'mobx'

import fecthAPI from 'services/fetchAPI'
import { ENDPOINT } from 'constants/api'

export default class Student {
  @observable info: Data.Student | null = null

  fetchStudentInfo = flow(function* () {
    const self = this as Student

    try {
      const respose = yield fecthAPI<Data.Student>({ endpoint: ENDPOINT.STUDENT_INFO })
      const data = respose.data as Data.Student

      self.info = data
    } catch (error) {
      console.error(error)
    }
  })
}
