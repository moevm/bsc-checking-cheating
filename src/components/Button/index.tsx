import React, { FC, ButtonHTMLAttributes } from 'react'

import S from './styles'

type TOuterProps = ButtonHTMLAttributes<HTMLButtonElement> & {}
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, ...props }) => {
  return (
    <S.Button type="button" {...props}>
      <span>{children}</span>
    </S.Button>
  )
}

export default Button
