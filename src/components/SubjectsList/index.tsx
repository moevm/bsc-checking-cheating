import React, { FC, MouseEventHandler } from 'react'
import { observer } from 'mobx-react'

import Button from 'components/Button'

import S from './styles'

type TOuterProps = {
  className?: string
  list: {
    name: string
  }[]
  onAddButtonClick?: MouseEventHandler<HTMLButtonElement>
}
type TProps = TOuterProps

const List: FC<TProps> = ({ className, children, list, onAddButtonClick }) => {
  return (
    <S.List className={className}>
      {!!list && list.map((item, index) => <S.Item key={index}>{item.name}</S.Item>)}
      {!!onAddButtonClick && (
        <S.Item>
          <Button onClick={onAddButtonClick}>Добавить предмет</Button>
        </S.Item>
      )}
    </S.List>
  )
}

export default observer(List)
