import React, { FC, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { useRouter } from 'react-router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SubjectsList from 'components/SubjectsList'
import TaskItem from './components/TaskItem'

type TOuterProps = App.TInjectedRouteProps & {}
type TProps = TOuterProps

const TeacherIndexPage: FC<TProps> = () => {
  const { teacher } = useStore()
  const router = useRouter()

  const onSubjectItemClick = useCallback(
    (subject: Data.Subject) => () => {
      teacher.toggleSubject(subject)
    },
    []
  )

  const onAddButtonClick = useCallback(
    (subject: Data.Subject) => () => {
      teacher.addDraftTask(subject)
      router.navigate('teacher.task', { id: 'new' })
    },
    []
  )

  return (
    <SubjectsList
      subjects={teacher.info.subjects}
      TaskItem={TaskItem}
      onAddButtonClick={onAddButtonClick}
      onSubjectItemClick={onSubjectItemClick}
    />
  )
}

export default compose(hot, observer)(TeacherIndexPage)
