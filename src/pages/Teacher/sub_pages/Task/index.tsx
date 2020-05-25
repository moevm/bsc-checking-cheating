import React, { FC, useEffect, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SolutionsTable from 'components/SolutionsTable'
import TaskForm from './components/Form'

type TOuterProps = App.TInjectedRouteProps & {}
type TProps = TOuterProps

const useStyles = makeStyles(() => ({
  paper: {
    marginBottom: '1.25rem'
  }
}))

const TeacherTaskPage: FC<TProps> = ({ route }) => {
  const { teacher } = useStore()
  const classes = useStyles()

  useEffect(() => {
    teacher.fetchTaskInfo(route.params.id)
  }, [])

  const onFormSubmit = useCallback((task: Data.Task) => {
    teacher.updateTask(task)
  }, [])

  if (teacher.task) {
    return (
      <Box>
        <TaskForm className={classes.paper} task={teacher.task} onFormSubmit={onFormSubmit} />
        <SolutionsTable solutions={teacher.task.solutions} />
      </Box>
    )
  }
}

export default compose(hot, observer)(TeacherTaskPage)
