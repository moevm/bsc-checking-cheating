import React, { FC } from 'react'

import { Wrapper, Container } from './styles'

type TOuterProps = {
  className?: string
}
type TProps = TOuterProps

const Modal: FC<TProps> = ({ className, children }) => {
  return (
    <Wrapper>
      <Container className={className}>{children}</Container>
    </Wrapper>
  )
}

export default Modal
