import React, { FC, ButtonHTMLAttributes } from 'react'

import colors from 'lib/theme/colors'

import S from './styles'

export type TOuterProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  nColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, nColor, ...props }) => (
  <S.Button
    {...props}
    variant="contained"
    color="primary"
    style={{
      backgroundColor: colors[nColor.toUpperCase()]
    }}
  >
    {children}
  </S.Button>
)

Button.defaultProps = {
  nColor: 'primary'
}

export default Button
