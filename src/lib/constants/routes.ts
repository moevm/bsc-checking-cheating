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
    component: universalRoute(import('../../pages/Teacher'))
  },
  {
    name: 'teacher.index',
    path: '/',
    accessType: 'teacher',
    component: universalRoute(import('../../pages/Teacher/sub_pages/Index'))
  },
  {
    name: 'teacher.task',
    path: '/task/:id',
    accessType: 'teacher',
    component: universalRoute(import('../../pages/Teacher/sub_pages/Task'))
  },
  {
    name: 'student',
    path: '/student',
    accessType: 'student',
    component: universalRoute(import('../../pages/Student'))
  },
  {
    name: 'admin',
    path: '/admin',
    accessType: 'admin',
    component: universalRoute(import('../../pages/Admin'))
  }
]
