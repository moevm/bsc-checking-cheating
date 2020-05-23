import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import PageSection from 'components/PageSection'
import SubjectsList from 'components/SubjectsList'
import UploadModal from './components/UploadModal'

type TOuterProps = {}
type TProps = TOuterProps

const StudentPage: FC<TProps> = () => {
  const { student } = useStore()

  useEffect(() => {
    student.fetchStudentInfo()
  }, [])

  const onCloseClick = useCallback(() => {
    student.closeModal()
    student.removeFile()
  }, [])

  return (
    !!student.info && (
      <PageSection title={student.info.name}>
        {/* {student.modalIsOpen && <UploadModal onClose={onCloseClick} />}
        <SubjectsList subjects={student.info.subjects} /> */}
      </PageSection>
    )
  )
}

export default compose(hot, observer)(StudentPage)
