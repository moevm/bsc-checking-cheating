import React, { FC, ChangeEventHandler, useCallback } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import Input from 'components/Input'

import S from './styles'

type TOuterProps = {
  data: Data.Subject
}
type TProps = TOuterProps

const SubjectItem: FC<TProps> = ({ data }) => {
  const { teacher } = useStore()

  const onInputChange = useCallback(
    (property: string): ChangeEventHandler<HTMLInputElement> => e => {
      teacher.changeSubject(data, property, e.target.value)
    },
    []
  )

  const onCreateClick = useCallback(() => {
    teacher.createSubject(data)
  }, [])

  return (
    <S.Item>
      <Input
        value={data.name}
        onChange={onInputChange('name')}
        disabled={!(data.isCreating || data.isEditing)}
      />
      <Input
        value={data.groups.toString()}
        onChange={onInputChange('groups')}
        disabled={!(data.isCreating || data.isEditing)}
      />
      {data.isCreating ? <Button onClick={onCreateClick}>Создать</Button> : 'Сохранено'}
    </S.Item>
  )
}

export default observer(SubjectItem)
