import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { withRoute } from 'react-router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SolutionsTable from 'components/SolutionsTable'

type TOuterProps = App.TInjectedRouteProps & {}
type TProps = TOuterProps

const TeacherTaskPage: FC<TProps> = ({ route }) => {
  const { teacher } = useStore()

  useEffect(() => {
    teacher.getSolutionsByTaskId(route.params.id)
  }, [])

  console.log(teacher.solutions)

  return !!teacher.solutions && <SolutionsTable solutions={teacher.solutions} />
}

export default compose(hot, observer)(TeacherTaskPage)
