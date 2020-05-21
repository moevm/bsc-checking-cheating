import React, { FC, MouseEventHandler } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import SubjectItem from 'components/SubjectItem'

import S from './styles'

type TOuterProps = {
  className?: string
  isStudent?: boolean
  subjects: Data.Subject[]
  onAddButtonClick?: MouseEventHandler<HTMLButtonElement>
}
type TProps = TOuterProps

const List: FC<TProps> = ({ className, isStudent, subjects, onAddButtonClick }) => {
  const { teacher } = useStore()

  return (
    <S.List className={className}>
      {!!subjects &&
        subjects.map((item, index) => (
          <SubjectItem key={index} data={item} isStudent={isStudent} />
        ))}
      {!!onAddButtonClick && !teacher.subjectIsCreating && !isStudent && (
        <S.Item>
          <Button onClick={onAddButtonClick}>Добавить предмет</Button>
        </S.Item>
      )}
    </S.List>
  )
}

export default observer(List)
