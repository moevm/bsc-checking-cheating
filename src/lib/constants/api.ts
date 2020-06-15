const DEV_DOMAIN = 'http://localhost:3000'

export const API_URL = `${DEV_DOMAIN}/api/v1`

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export const ENDPOINT = {
  ADMIN: '/admin',
  AUTH: '/auth',
  GROUP: '/group',
  SOLUTION: '/solution',
  SOLUTIONS: '/solutions',
  SUBJECT: '/subject',
  TASK: '/task',
  STUDENT_INFO: '/student_info',
  TEACHER_INFO: '/teacher_info',
  USER: '/user_info'
}
