import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import PageSection from 'components/PageSection'
import SubjectsList from 'components/SubjectsList'

type TOuterProps = {}
type TProps = TOuterProps

const TeacherPage: FC<TProps> = () => {
  const { teacher } = useStore()

  useEffect(() => {
    teacher.fetchTeacherInfo()
  }, [])

  const onAddSubjectClick = useCallback(() => {
    teacher.addDraftSubject()
  }, [])

  return (
    !!teacher.info && (
      <PageSection title={teacher.info.name}>
        <SubjectsList subjects={teacher.info.subjects} onAddButtonClick={onAddSubjectClick} />
      </PageSection>
    )
  )
}

export default compose(hot, observer)(TeacherPage)
