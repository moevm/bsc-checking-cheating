import { Route } from 'router5'
import universal from 'react-universal-component'

export type TCustomRoute = Route & {
  accessType?: 'admin' | 'student' | 'teacher'
  component?: ReturnType<typeof universalRoute>
}

const universalRoute = loadSpec =>
  universal<Partial<App.TInjectedRouteProps>>(loadSpec, {
    ignoreBabelRename: true
  })

export const routes: TCustomRoute[] = [
  {
    name: 'index',
    path: '/',
    forwardTo: 'auth'
  },
  {
    name: 'auth',
    path: '/auth',
    component: universalRoute(import('../../pages/Auth'))
  },
  {
    name: 'teacher',
    path: '/teacher',
    forwardTo: 'teacher.index',
    accessType: 'teacher',
    component: universalRoute(import('../../pages/Teacher'))
  },
  {
    name: 'teacher.index',
    path: '/',
    component: universalRoute(import('../../pages/Teacher/sub_pages/Index'))
  },
  {
    name: 'teacher.task',
    path: '/task/:id',
    component: universalRoute(import('../../pages/Teacher/sub_pages/Task'))
  },
  {
    name: 'student',
    path: '/student',
    accessType: 'student',
    component: universalRoute(import('../../pages/Student'))
  }
]
