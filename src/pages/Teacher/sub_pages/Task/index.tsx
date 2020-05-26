import React, { FC, useEffect, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SolutionsTable from 'components/SolutionsTable'
import DiffModal from './components/DiffModal'
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

    return () => teacher.closeModal()
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

  const onCloseModalClick = useCallback(() => {
    teacher.closeModal()
  }, [])

  if (teacher.task) {
    return (
      <Box>
        <TaskForm className={classes.paper} task={teacher.task} onFormSubmit={onFormSubmit} />
        <SolutionsTable solutions={teacher.task.solutions} onRowClick={onShowFileClick} />
        {!!teacher.modal && (
          <DiffModal difference={teacher.modal} onCloseClick={onCloseModalClick} />
        )}
      </Box>
    )
  }
}

export default compose(hot, observer)(TeacherTaskPage)
