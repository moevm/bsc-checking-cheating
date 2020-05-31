import React, { FC, InputHTMLAttributes } from 'react'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = InputHTMLAttributes<HTMLButtonElement> & {}
type TProps = TOuterProps

const Button: FC<TProps> = ({ children, ...props }) => {
  return <S.Input {...props} />
}

export default observer(Button)
