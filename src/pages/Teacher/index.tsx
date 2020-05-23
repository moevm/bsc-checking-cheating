import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import Button from 'components/Button'
import PageSection from 'components/PageSection'
import SubjectsList from 'components/SubjectsList'
import SubjectItem from './components/SubjectItem'

type TOuterProps = {}
type TProps = TOuterProps

const TeacherPage: FC<TProps> = () => {
  const { teacher } = useStore()

  useEffect(() => {
    teacher.fetchTeacherInfo()
  }, [])

  const onAddSubjectClick = useCallback(() => {
    teacher.addLocalSubject()
  }, [])

  return (
    !!teacher.info && (
      <PageSection title={teacher.info.name}>
        <SubjectsList Item={SubjectItem} subjects={teacher.info.subjects}>
          {teacher.noActiveAction && <Button onClick={onAddSubjectClick}>Добавить предмет</Button>}
        </SubjectsList>
      </PageSection>
    )
  )
}

export default compose(hot, observer)(TeacherPage)
