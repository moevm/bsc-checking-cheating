import React, { FC } from 'react'

import { SUCCESS, DANGER } from 'lib/theme/colors'

import S from './styles'

export type TOuterProps = {
  className?: string
  bound: number
  result: string
}
type TProps = TOuterProps

const Button: FC<TProps> = ({ className, result, bound }) => (
  <S.Button
    className={className}
    style={{ backgroundColor: parseFloat(result) >= bound ? SUCCESS : DANGER }}
  >
    {result}
  </S.Button>
)

export default Button
