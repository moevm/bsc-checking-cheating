import React, { FC, useEffect, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { useRouter } from 'react-router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SolutionsTable from 'components/SolutionsTable'
import DiffModal from './components/DiffModal'

import S from './styles'

type TOuterProps = App.TInjectedRouteProps & {}
type TProps = TOuterProps

const TeacherTaskPage: FC<TProps> = ({ route }) => {
  const { teacher } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (typeof route.params.id === 'number') {
      teacher.fetchTaskInfo(route.params.id)
    }

    return () => teacher.closeModal()
  }, [])

  const onCancelClick = () => {
    teacher.removeDraftTask()
    router.navigate('teacher')
  }

  const onFormSubmit = useCallback((task: Data.Task) => {
    if (teacher.task.isCreating) {
      teacher.createTask(task)
    } else {
      teacher.updateTask(task)
    }
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
        <S.TaskForm
          task={teacher.task}
          onCancelCreating={onCancelClick}
          onFormSubmit={onFormSubmit}
        />
        <SolutionsTable solutions={teacher.task.solutions} onRowClick={onShowFileClick} />
        {!!teacher.modal && (
          <DiffModal difference={teacher.modal} onCloseClick={onCloseModalClick} />
        )}
      </Box>
    )
  }
}

export default compose(hot, observer)(TeacherTaskPage)
