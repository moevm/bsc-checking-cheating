import React, { FC } from 'react'

import S from './styles'

type TOuterProps = {}
type TProps = TOuterProps

const Item: FC<TProps> = ({ children }) => <S.Item>{children}</S.Item>

export default Item
