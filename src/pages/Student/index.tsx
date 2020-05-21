import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import SubjectsList from 'components/SubjectsList'
import UploadModal from './components/UploadModal'

import { Section } from './styles'

type TOuterProps = {}
type TProps = TOuterProps
type TState = {
  modalIsOpen: boolean
}

const StudentPage: FC<TProps> = () => {
  const { student } = useStore()

  useEffect(() => {
    student.fetchStudentInfo()
  }, [])

  const onCloseClick = useCallback(() => {
    student.closeModal()
  }, [])

  return (
    !!student.info && (
      <Section>
        <h1>{student.info.name}</h1>
        {/* <button onClick={() => this.setState({ modalIsOpen: true })}>open</button> */}
        {student.modalIsOpen && <UploadModal onClose={onCloseClick} />}
        <SubjectsList subjects={student.info.subjects} isStudent />
      </Section>
    )
  )
}

export default compose(hot, observer)(StudentPage)
