import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => {
  const { student } = useStore()

  const onItemClick = useCallback(() => {
    student.openModal(data)
  }, [])

  return (
    <ListItem button onClick={onItemClick}>
      <ListItemText>{data.name}</ListItemText>
      <Button color="primary" variant="contained">
        Загрузить
      </Button>
    </ListItem>
  )
}

export default observer(TaskItem)
