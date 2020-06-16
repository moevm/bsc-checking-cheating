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
  const router = useRouter()
  const { teacher } = useStore()

  useEffect(() => {
    if (!teacher.task) {
      if (route.params.id === 'new') {
        router.navigate('teacher')
      } else {
        teacher.requestTaskInfo(route.params.id)
      }
    }

    return () => {
      teacher.removeDraftTask()
      teacher.closeModal()
    }
  }, [teacher.removeDraftTask])

  const onCancelClick = useCallback(() => {
    router.navigate('teacher')
  }, [])

  const onFormSubmit = useCallback(
    (newTask: Data.Task) => {
      if (teacher.task.isCreating) {
        teacher.createTask(newTask)
        router.navigate('teacher')
      } else {
        teacher.updateTask(newTask)
      }
    },
    [teacher.createTask, teacher.updateTask]
  )

  const onDeleteClick = useCallback(() => {
    router.navigate('teacher')
    teacher.deleteTask(teacher.task)
  }, [teacher.deleteTask, teacher.task])

  const onShowFileClick = useCallback(
    (solution: Data.Solution) => () => {
      teacher.fetchStudentSolution(solution)
    },
    []
  )

  const onCloseModalClick = useCallback(() => {
    teacher.closeModal()
  }, [])

  return teacher.task ? (
    <Box>
      <S.Link routeName="teacher">Вернуться назад</S.Link>
      <S.TaskForm
        exts={teacher.info.exts}
        task={teacher.task}
        onCancelCreating={onCancelClick}
        onDeleteClick={onDeleteClick}
        onFormSubmit={onFormSubmit}
      />
      {!!teacher.task.solutions && (
        <SolutionsTable
          bound={teacher.task.bound}
          solutions={teacher.task.solutions}
          onRowClick={onShowFileClick}
        />
      )}
      {!!teacher.modal && <DiffModal difference={teacher.modal} onCloseClick={onCloseModalClick} />}
    </Box>
  ) : (
    <p>loading</p>
  )
}

export default compose(hot, observer)(TeacherTaskPage)
