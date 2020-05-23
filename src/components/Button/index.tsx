import React, { FC, ButtonHTMLAttributes } from 'react'

import S from './styles'

export type TOuterProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'regular'
}
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, ...props }) => (
  <S.Button type="button" {...props}>
    {children}
  </S.Button>
)

Button.defaultProps = {
  color: 'primary',
  size: 'regular'
}

export default Button
