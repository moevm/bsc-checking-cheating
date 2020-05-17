import React, { PureComponent, MouseEventHandler, FC, useEffect } from 'react'
import { observer } from 'mobx-react'

import compose from 'utils/compose'
import useStore from 'hooks/useStore'
import UploadModal from './components/UploadModal'

import { Section } from './styles'

type TOuterProps = {}
// type TStateProps = {
//   student: App.TStore['student']
//   store: App.TStore
// }
type TProps = TOuterProps
//  & TStateProps
type TState = {
  modalIsOpen: boolean
}

// class StudentPage extends PureComponent<TProps, TState> {
//   state = {
//     modalIsOpen: false
//   }

//   componentDidMount() {
//     const { student, store } = this.props

//     console.log(student, store.student)

//     // student.fetchStudentInfo()
//   }

//   onCloseClick: MouseEventHandler<HTMLButtonElement> = () => {
//     this.setState({
//       modalIsOpen: false
//     })
//   }

//   render() {
//     const { modalIsOpen } = this.state

//     return (
//       <Section>
//         <h1>student</h1>
//         <button onClick={() => this.setState({ modalIsOpen: true })}>open</button>
//         {modalIsOpen && <UploadModal onClose={this.onCloseClick} />}
//       </Section>
//     )
//   }
// }

const StudentPage: FC<TProps> = () => {
  const { student } = useStore()

  useEffect(() => {
    student.fetchStudentInfo()
  }, [])

  return (
    <Section>
      {!!student.info && <h1>{student.info.name}</h1>}
      <button onClick={() => this.setState({ modalIsOpen: true })}>open</button>
      {/* {modalIsOpen && <UploadModal onClose={this.onCloseClick} />} */}
    </Section>
  )
}

export default observer(StudentPage)
