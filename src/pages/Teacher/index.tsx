import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'

import { Section } from './styles'

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

  return (
    <Section>
      {!!teacher.info && <h1>{teacher.info.name}</h1>}
      <button onClick={() => this.setState({ modalIsOpen: true })}>open</button>
      {/* {modalIsOpen && <UploadModal onClose={this.onCloseClick} />} */}
    </Section>
  )
}

export default observer(TeacherPage)
