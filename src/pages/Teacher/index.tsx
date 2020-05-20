import React, { FC, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader/root'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'

import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps
type TState = {
  modalIsOpen: boolean
}

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
      <S.Section>
        <h1>{teacher.info.name}</h1>
        <S.SubjectsList subjects={teacher.info.subjects} onAddButtonClick={onAddSubjectClick} />
      </S.Section>
    )
  )
}

export default compose(hot, observer)(TeacherPage)
