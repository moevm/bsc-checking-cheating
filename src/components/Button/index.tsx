import React, { FC, ButtonHTMLAttributes } from 'react'

type TOuterProps = ButtonHTMLAttributes<HTMLButtonElement>
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, ...props }) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  )
}

export default Button
