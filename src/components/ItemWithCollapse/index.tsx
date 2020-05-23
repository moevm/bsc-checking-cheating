import React, { FC } from 'react'
import Collapse from '@material-ui/core/Collapse'

import Item from 'components/Item'

import S from './styles'

type TOuterProps = {
  head: JSX.Element
  isOpened: boolean
}
type TProps = TOuterProps

const ItemWithCollapse: FC<TProps> = ({ children, head, isOpened }) => (
  <Item>
    <S.Container>{head}</S.Container>
    <Collapse in={isOpened}>
      <S.ChildrenList>{children}</S.ChildrenList>
    </Collapse>
  </Item>
)

export default ItemWithCollapse
