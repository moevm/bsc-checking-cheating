import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'
import { SubscribeState } from 'router5'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import Button from 'components/Button'
import SubjectsList from 'components/SubjectsList'
import SubjectItem from './components/SubjectItem'

type TOuterProps = SubscribeState & {}
type TProps = TOuterProps

const TeacherIndexPage: FC<TProps> = ({ route }) => {
  const { teacher } = useStore()

  const onAddSubjectClick = useCallback(() => {
    teacher.addLocalSubject()
  }, [])

  const onSubjectItemClick = useCallback(
    (subject: Data.Subject) => () => {
      teacher.toggleSubject(subject)
    },
    []
  )

  return (
    <SubjectsList
      Item={SubjectItem}
      subjects={teacher.info.subjects}
      onSubjectItemClick={onSubjectItemClick}
    >
      {teacher.noActiveAction && <Button onClick={onAddSubjectClick}>Добавить предмет</Button>}
    </SubjectsList>
  )
}

export default compose(hot, observer)(TeacherIndexPage)
