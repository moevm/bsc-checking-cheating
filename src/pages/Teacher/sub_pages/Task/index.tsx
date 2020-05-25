import React, { FC, useEffect, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SolutionsTable from 'components/SolutionsTable'
import TaskForm from './components/Form'

type TOuterProps = App.TInjectedRouteProps & {}
type TProps = TOuterProps

const TeacherTaskPage: FC<TProps> = ({ route }) => {
  const { teacher } = useStore()

  useEffect(() => {
    teacher.fetchTaskInfo(route.params.id)
  }, [])

  if (teacher.task) {
    return (
      <Box>
        <TaskForm task={teacher.task} />
        <SolutionsTable solutions={teacher.task.solutions} />
      </Box>
    )
  }
}

export default compose(hot, observer)(TeacherTaskPage)
