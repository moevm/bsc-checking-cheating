import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import PageSection from 'components/PageSection'
import SubjectsList from 'components/SubjectsList'
import TaskItem from './components/TaskItem'
import UploadModal from './components/UploadModal'

type TOuterProps = {}
type TProps = TOuterProps

const StudentPage: FC<TProps> = () => {
  const { student } = useStore()

  useEffect(() => {
    student.requestStudentInfo()
  }, [])

  const onSubjectItemClick = useCallback(
    (subject: Data.Subject) => () => {
      student.toggleSubject(subject)
    },
    [student.toggleSubject]
  )

  return (
    !!student.info && (
      <PageSection title={student.info.name}>
        <SubjectsList
          subjects={student.info.subjects}
          TaskItem={TaskItem}
          onSubjectItemClick={onSubjectItemClick}
        />
        {student.modalIsOpen && <UploadModal />}
      </PageSection>
    )
  )
}

export default compose(hot, observer)(StudentPage)
