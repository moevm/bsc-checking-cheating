import React, { FC, ComponentType } from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'

import sizes from 'lib/theme/sizes'
import CustomPaper from 'components/CustomPaper'

type TOuterProps = {
  subjects: Data.Subject[]
  TaskItem: ComponentType<{ data: Data.Task }>
  onSubjectItemClick: (subject: Data.Subject) => () => void
}
type TProps = TOuterProps

const useStyles = makeStyles(() => ({
  paper: {
    marginBottom: sizes.MARGIN
  }
}))

const SubjectsList: FC<TProps> = ({ children, subjects, TaskItem, onSubjectItemClick }) => {
  const classes = useStyles()

  return (
    <List subheader={<ListSubheader component="div">Предметы</ListSubheader>}>
      {subjects.map((item, index) => (
        <CustomPaper key={index} className={classes.paper}>
          <ListItem button onClick={onSubjectItemClick(item)}>
            <ListItemText>{item.name}</ListItemText>
            {item.isOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={item.isOpened}>
            <List disablePadding>
              {item.tasks.map((item, index) => (
                <TaskItem key={index} data={item} />
              ))}
            </List>
          </Collapse>
        </CustomPaper>
      ))}
    </List>
  )
}

export default observer(SubjectsList)
