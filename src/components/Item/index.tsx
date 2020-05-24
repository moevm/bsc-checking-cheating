import React, { FC } from 'react'

import S from './styles'

type TOuterProps = {
  className?: string
}
type TProps = TOuterProps

const Item: FC<TProps> = ({ className, children }) => (
  <S.Item className={className}>{children}</S.Item>
)

export default Item
