import React, { FC } from 'react'

import S from './styles'

type TOuterProps = {
  className?: string
  onCloseClick?: () => void
}
type TProps = TOuterProps

const Modal: FC<TProps> = ({ className, children, onCloseClick }) => {
  return (
    <S.Wrapper>
      <S.Container className={className}>{children}</S.Container>
      {!!onCloseClick && (
        <S.Button variant="contained" onClick={onCloseClick}>
          <S.Close />
        </S.Button>
      )}
    </S.Wrapper>
  )
}

export default Modal
