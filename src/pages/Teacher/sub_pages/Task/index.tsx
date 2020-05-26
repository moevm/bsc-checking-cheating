import React, { FC, useEffect, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import DiffViewer from 'components/DiffViewer'
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

  const onShowFileClick = useCallback(
    (solution: Data.Solution) => () => {
      teacher.fetchStudentSolution(solution)
    },
    []
  )

  if (teacher.task) {
    return (
      <Box>
        <TaskForm className={classes.paper} task={teacher.task} onFormSubmit={onFormSubmit} />
        <SolutionsTable solutions={teacher.task.solutions} onRowClick={onShowFileClick} />
        {!!teacher.difference && (
          <DiffViewer
            original={teacher.difference.reference.file}
            plagiat={teacher.difference.current.file}
          />
        )}
      </Box>
    )
  }
}

export default compose(hot, observer)(TeacherTaskPage)
