import React, { FC, ButtonHTMLAttributes } from 'react'

import S from './styles'

export type TOuterProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  nColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, ...props }) => (
  <S.Button {...props} variant="contained" color="primary">
    {children}
  </S.Button>
)

Button.defaultProps = {
  nColor: 'primary'
}

export default Button
