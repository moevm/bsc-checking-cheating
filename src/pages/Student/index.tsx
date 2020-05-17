import React, { PureComponent, MouseEventHandler } from 'react'

import UploadModal from './components/UploadModal'

import { Section } from './styles'

type TOuterProps = {}
type TProps = TOuterProps
type TState = {
  modalIsOpen: boolean
}

class StudentPage extends PureComponent<TProps, TState> {
  state = {
    modalIsOpen: false
  }

  onCloseClick: MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    const { modalIsOpen } = this.state

    return (
      <Section>
        <h1>student</h1>
        <button onClick={() => this.setState({ modalIsOpen: true })}>open</button>
        {modalIsOpen && <UploadModal onClose={this.onCloseClick} />}
      </Section>
    )
  }
}

export default StudentPage
