import React, { FC, useCallback } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => {
  const onItemClick = useCallback(() => {}, [])

  return (
    <ListItem button onClick={onItemClick}>
      <ListItemText>{data.name}</ListItemText>
    </ListItem>
  )
}

export default observer(TaskItem)
