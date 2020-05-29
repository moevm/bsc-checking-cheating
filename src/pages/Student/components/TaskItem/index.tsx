import React, { FC, useCallback, useMemo } from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import { SUCCESS, DANGER } from 'lib/theme/colors'

import S from './styles'

type TOuterProps = {
  task: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ task }) => {
  const { student } = useStore()
  const withResult = !!task.originality

  const onItemClick = useCallback(() => {
    // if (!task.originality) {
    student.openModal(task)
    // }
  }, [task])

  return (
    <S.ListItem button onClick={onItemClick}>
      <ListItemText>{task.name}</ListItemText>
      {/* {task.originality ? (
        <ListItemText>оригинальность: {task.originality}%</ListItemText>
      ) : ( */}
      <S.Button color="primary" variant="contained">
        {withResult ? 'Заменить решение' : 'Загрузить'}
      </S.Button>
      {withResult && (
        <S.Result
          style={{ backgroundColor: parseFloat(task.originality) >= task.bound ? SUCCESS : DANGER }}
        >
          {task.originality}
        </S.Result>
      )}
    </S.ListItem>
  )
}

export default observer(TaskItem)
