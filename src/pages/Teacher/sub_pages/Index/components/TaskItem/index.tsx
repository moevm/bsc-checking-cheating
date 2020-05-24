import React, { FC, ChangeEventHandler, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router5'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import Input from 'components/Input'

import S from './styles'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => {
  const { teacher } = useStore()

  const onInputChange = useCallback(
    (property: string): ChangeEventHandler<HTMLInputElement> => e => {
      teacher.changeObject(data, property, e.target.value)
    },
    []
  )

  return (
    <S.Item>
      <Input
        value={data.name}
        onChange={onInputChange('name')}
        disabled={!(data.isCreating || data.isEditing)}
      />
      <Input
        value={data.exts.toString()}
        onChange={onInputChange('exts')}
        disabled={!(data.isCreating || data.isEditing)}
      />

      <Input
        value={data.groups.toString()}
        onChange={onInputChange('groups')}
        disabled={!(data.isCreating || data.isEditing)}
      />

      {/* {isStudent ? (
        <Button onClick={onOpenModalClick}>Загрузить</Button>
      ) : data.isCreating ? (
        <Button onClick={onCreateClick}>Создать</Button>
      ) : ( */}
      <Link routeName="teacher.task" routeParams={{ id: data.id }}>
        Решения
      </Link>
    </S.Item>
  )
}

export default observer(TaskItem)
