import React, { FC, InputHTMLAttributes } from 'react'

import { observer } from 'mobx-react'

type TOuterProps = InputHTMLAttributes<HTMLButtonElement> & {}
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, ...props }) => {
  return <input {...props} />
}

export default observer(Button)
