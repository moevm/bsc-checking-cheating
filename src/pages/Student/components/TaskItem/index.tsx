import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      '& $button': {
        opacity: 1
      }
    }
  },
  result: {
    textAlign: 'right'
  },
  button: {
    opacity: 0,
    transition: 'opacity 0.3s'
  }
}))

const TaskItem: FC<TProps> = ({ data }) => {
  const { student } = useStore()
  const classes = useStyles()

  const onItemClick = useCallback(() => {
    // if (!data.originality) {
    student.openModal(data)
    // }
  }, [data])

  return (
    <ListItem className={classes.listItem} button divider onClick={onItemClick}>
      <ListItemText>{data.name}</ListItemText>
      {/* {data.originality ? (
        <ListItemText className={classes.result}>оригинальность: {data.originality}%</ListItemText>
      ) : ( */}
      <Button className={classes.button} color="primary" variant="contained">
        Загрузить
      </Button>
      {/* )} */}
    </ListItem>
  )
}

export default observer(TaskItem)
