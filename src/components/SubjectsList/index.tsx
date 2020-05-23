import React, { FC, ComponentType } from 'react'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = {
  className?: string
  Item: ComponentType<{ data: Data.Subject }>
  subjects: Data.Subject[]
}
type TProps = TOuterProps

const List: FC<TProps> = ({ className, children, Item, subjects }) => (
  <S.List className={className}>
    {!!subjects && subjects.map((item, index) => <Item key={index} data={item} />)}
    {children}
  </S.List>
)

export default observer(List)
