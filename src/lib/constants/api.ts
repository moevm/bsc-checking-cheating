const DEV_DOMAIN = 'http://localhost:3000'

export const API_URL = `${DEV_DOMAIN}/api/v1`

export enum METHOD {
  GET = 'get',
  POST = 'post'
}

export const ENDPOINT = {
  CREATE_SUBJECT: '/create_subject',
  CREATE_TASK: '/create_task',
  STUDENT_INFO: '/student_info',
  TEACHER_INFO: '/teacher_info'
}
