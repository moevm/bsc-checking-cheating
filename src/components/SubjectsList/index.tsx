import React, { FC, ComponentType } from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'
import { observer } from 'mobx-react'

type TOuterProps = {
  subjects: Data.Subject[]
  TaskItem: ComponentType<{ data: Data.Task }>
  onSubjectItemClick: (subject: Data.Subject) => () => void
}
type TProps = TOuterProps

const SubjectsList: FC<TProps> = ({ children, subjects, TaskItem, onSubjectItemClick }) => (
  <Paper elevation={4}>
    <List subheader={<ListSubheader component="div">Предметы</ListSubheader>}>
      {subjects.map((item, index) => (
        <Box key={index}>
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
        </Box>
      ))}
    </List>
  </Paper>
)

export default observer(SubjectsList)
